# frozen_string_literal: true

module Mutations
  class UpdateCardMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::CardAttributes, required: true

    field :card, Types::CardType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    # rubocop:disable Metrics/MethodLength
    def resolve(id:, attributes:)
      card = Card.find(id)

      unless allowed_to?(:update?, card, context: { user: context[:current_user] })
        return { errors:
          { full_messages: ['Unauthorized to perform this action'] } }
      end

      if card.update(attributes.to_h)
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug }, card)
        { card: card }
      else
        { errors: card.errors }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
