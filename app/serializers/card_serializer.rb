class CardSerializer < ActiveModel::Serializer
  include ActionPolicy::Behaviour
  
  attributes :id, :kind, :body, :likes
  has_one :author
  
end
