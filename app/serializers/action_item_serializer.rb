class ActionItemSerializer < ActiveModel::Serializer  
  attributes :id, :body, :times_moved, :status
  
end