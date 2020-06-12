# frozen_string_literal: true

module Types
  class DeletedCardType < Types::BaseObject
    field :id, Int, null: false
    field :kind, Enums::Kind, null: false
  end
end
