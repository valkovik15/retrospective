# frozen_string_literal: true

module Types
  class CommentType < Types::BaseObject
    field :id, Int, null: false
    field :card_id, Int, null: false
    field :content, String, null: false
    field :author, Types::UserType, null: false
  end
end
