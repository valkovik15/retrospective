# frozen_string_literal: true

module Mutations
  class DestroyCardMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: false
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(id:)
      card = Card.find(id)
      unless allowed_to?(:destroy?, card, context: { user: context[:current_user] })
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end
      if card.destroy
        RetrospectiveSchema.subscriptions.trigger('card_destroyed',
                                                  { board_slug: card.board.slug },
                                                  id: id, kind: card.kind)
        { id: id }
      else
        { errors: card.errors.full_messages }
      end
    end
  end
end
