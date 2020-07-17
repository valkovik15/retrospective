# frozen_string_literal: true

module Mutations
  class UpdateActionItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::ActionItemAttributes, required: true

    field :action_item, Types::ActionItemType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    # rubocop:disable Metrics/MethodLength
    def resolve(id:, attributes:)
      action_item = ActionItem.find(id)

      unless allowed_to?(:update?, action_item, context: { user: context[:current_user],
                                                           board: action_item.board },
                                                with: API::ActionItemPolicy)
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      if action_item.update(attributes.to_h)
        RetrospectiveSchema.subscriptions.trigger('action_item_updated',
                                                  { board_slug: action_item.board.slug },
                                                  action_item)
        { action_item: action_item }
      else
        { errors: action_item.errors }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
