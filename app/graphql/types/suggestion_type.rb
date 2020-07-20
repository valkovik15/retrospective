# frozen_string_literal: true

module Types
  class SuggestionType < Types::BaseObject
    field :users, [String], null: false
    field :teams, [String], null: false
  end
end
