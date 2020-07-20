# frozen_string_literal: true

module Types
  class CardType < Types::BaseObject
    field :id, Int, null: false
    field :kind, String, null: false
    field :body, String, null: false
    field :likes, Int, null: false
    field :author_id, ID, null: false
    field :author, Types::UserType, null: false
    field :board_id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :comments, [Types::CommentType], null: false
  end
end
