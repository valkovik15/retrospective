module Mutations
  class AddCardMutation < Mutations::BaseMutation
    argument :attributes, Types::CardAttributes, required: true

    field :card, Types::CardType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(attributes:)
      # check_authentication!

      card = Card.new(attributes.to_h)
      # card = Card.new(attributes.to_h.merge(user: context[:current_user]))

      if card.save
        RetrospectiveSchema.subscriptions.trigger("cardAdded", {}, card)
        { card: card }
      else
        { errors: card.errors.full_messages }
      end
    end
  end
end