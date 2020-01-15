module Types
  class CardType < Types::BaseObject
    field :id, ID, null: false
    field :kind, String, null: false
    field :body, String, null: false
    field :likes, Int, null: false
    field :author, Types::UserType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
