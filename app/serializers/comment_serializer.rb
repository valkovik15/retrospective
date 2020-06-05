# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :author
end
