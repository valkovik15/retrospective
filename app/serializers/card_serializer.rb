class CardSerializer < ActiveModel::Serializer
  attributes :id, :kind, :body, :likes
  has_one :author
  
end
