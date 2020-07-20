# frozen_string_literal: true

module Queries
  class Suggestions < Queries::BaseQuery
    description 'Returns suggestions for given input'

    argument :autocomplete, String, required: true

    type Types::SuggestionType, null: false

    def resolve(autocomplete:)
      ::Boards::Suggestions.new(autocomplete).call
    end
  end
end
