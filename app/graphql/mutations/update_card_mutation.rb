module Mutations
  class UpdateCardMutation < Mutations::BaseMutation
    argument :attributes, Types::CardAttributes, required: true

    field :card, Types::CardType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(attributes:)
      # check_authentication!

      card = Card.find(id)

      if card.update(attributes.to_h)
        RetrospectiveSchema.subscriptions.trigger("cardUpdated", {}, card)
        { card: card }
      else
        { errors: card.errors.full_messages }
      end
    end
  end
end