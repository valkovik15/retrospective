# frozen_string_literal: true

module Mutations
  class DestroyActionItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(id:)
      action_item = ActionItem.find(id)
      unless allowed_to?(:destroy?, action_item, context: { user: context[:current_user],
                                                            board: action_item.board },
                                                 with: API::ActionItemPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end
      if action_item.destroy
        RetrospectiveSchema.subscriptions.trigger('action_item_destroyed',
                                                  { board_slug: action_item.board.slug },
                                                  id: id)
        { id: id }
      else
        { errors: card.errors }
      end
    end
  end
end
