# frozen_string_literal: true

module Mutations
  class LikeCardMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :card, Types::CardType, null: true
    def resolve(id:)
      card = Card.find(id)
      authorize! card, to: :like?, context: { user: context[:current_user] }

      if card.like!
        RetrospectiveSchema.subscriptions.trigger('card_updated',
                                                  { board_slug: card.board.slug },
                                                  card)
        { card: card }
      else
        { errors: { full_messages: card.errors.full_messages } }
      end
    end
  end
end
