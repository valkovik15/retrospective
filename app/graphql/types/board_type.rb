module Types
  class BoardType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :to_param, String, null: false
    field :cards, [Types::CardType], null: false
  end
end
