module Types
  class QueryType < Types::BaseObject
    field :boards, resolver: Queries::Boards
    field :board, resolver: Queries::Board
  end
end
