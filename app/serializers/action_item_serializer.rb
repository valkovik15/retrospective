# frozen_string_literal: true

class ActionItemSerializer < ActiveModel::Serializer
  attributes :id, :body, :times_moved, :status
end
