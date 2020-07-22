# frozen_string_literal: true

module Mutations
  class DestroyActionItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: true

    # rubocop:disable Metrics/MethodLength
    def resolve(id:)
      action_item = ActionItem.find(id)
      authorize! action_item, to: :destroy?, context: { user: context[:current_user],
                                                        board: action_item.board }

      if action_item.destroy
        RetrospectiveSchema.subscriptions.trigger('action_item_destroyed',
                                                  { board_slug: action_item.board.slug },
                                                  id: id)
        { id: id }
      else
        { errors: { full_messages: action_item.errors.full_messages } }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
