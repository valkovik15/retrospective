# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :boards, resolver: Queries::Boards
    field :board, resolver: Queries::Board
    field :membership, resolver: Queries::Membership
    field :memberships, resolver: Queries::Memberships
    field :suggestions, resolver: Queries::Suggestions
  end
end
