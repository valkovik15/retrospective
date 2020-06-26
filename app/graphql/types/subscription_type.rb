# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    field :action_item_added, Types::ActionItemType, null: false, description: 'An action item was added' do
      argument :boardSlug, String, required: true
    end

    field :action_item_moved, Types::ActionItemType, null: false, description: 'An action item was moved' do
      argument :boardSlug, String, required: true
    end

    field :action_item_destroyed, Types::ActionItemType, null: false, description: 'An action item was destroyed' do
      argument :boardSlug, String, required: true
    end

    field :action_item_updated, Types::ActionItemType, null: false, description: 'An action item was updated' do
      argument :boardSlug, String, required: true
    end

    field :card_added, Types::CardType, null: false, description: 'A card was added' do
      argument :boardSlug, String, required: true
    end
    field :card_updated, Types::CardType, null: false, description: 'A card wad updated' do
      argument :boardSlug, String, required: true
    end

    field :card_destroyed, Types::DeletedCardType, null: false, description: 'A card wad destroyed' do
      argument :boardSlug, String, required: true
    end

    def action_item_added(*); end
    def action_item_moved(*); end
    def action_item_destroyed(*); end
    def action_item_updated(*); end
    def card_added(*); end
    def card_updated(*); end
    def card_destroyed(*); end
  end
end
