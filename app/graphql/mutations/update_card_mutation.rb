# frozen_string_literal: true

module Mutations
  class UpdateCardMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :attributes, Types::CardAttributes, required: true

    field :card, Types::CardType, null: true
    def resolve(id:, attributes:)
      card = Card.find(id)
      authorize! card, to: :update?, context: { user: context[:current_user] }

      if card.update(attributes.to_h)
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug }, card)
        { card: card }
      else
        { errors: { full_messages: card.errors.full_messages } }
      end
    end
  end
end
