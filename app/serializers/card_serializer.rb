# frozen_string_literal: true

class CardSerializer < ActiveModel::Serializer
  attributes :id, :kind, :body, :likes
  has_one :author
end
