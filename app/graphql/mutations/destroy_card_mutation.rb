# frozen_string_literal: true

module Mutations
  class DestroyCardMutation < Mutations::BaseMutation
    argument :id, ID, required: true

    field :id, Int, null: false
    def resolve(id:)
      card = Card.find(id)
      authorize! card, to: :destroy?, context: { user: context[:current_user] }

      if card.destroy
        RetrospectiveSchema.subscriptions.trigger('card_destroyed',
                                                  { board_slug: card.board.slug },
                                                  id: id, kind: card.kind)
        { id: id }
      else
        { errors: { full_messages: card.errors.full_messages } }
      end
    end
  end
end
