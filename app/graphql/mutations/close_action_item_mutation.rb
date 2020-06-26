# frozen_string_literal: true

module Mutations
  class CloseActionItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :board_slug, String, required: true

    field :action_item, Types::ActionItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(id:, board_slug:)
      action_item = ActionItem.find(id)
      board = Board.find_by(slug: board_slug)
      unless allowed_to?(:close?, action_item, context: { user: context[:current_user], board: board }, with: API::ActionItemPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      if action_item.close!
        RetrospectiveSchema.subscriptions.trigger('action_item_updated', { board_slug: board.slug },
                                                  action_item)
        { action_item: action_item }
      else
        { errors: { full_messages: action_item.errors.full_messages } }
      end
    end
  end
end
