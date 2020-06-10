# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    field :card_added, Types::CardType, null: false, description: 'A card was added' do
      argument :boardSlug, String, required: true
    end
    field :card_updated, Types::CardType, null: false, description: 'A card wad updated'

    def card_added(*); end
    def card_updated; end
  end
end
