# frozen_string_literal: true

module Types
  class DeletedCardType < Types::BaseObject
    field :id, Int, null: false
    field :kind, String, null: false
  end
end
