module Types
  class SubscriptionType < GraphQL::Schema::Object
    field :card_added, Types::CardType, null: false, description: "Card was added"
    field :card_updated, Types::CardType, null: false, description: "Existing card was updated"

    def card_added; end
    def card_updated; end
  end
end