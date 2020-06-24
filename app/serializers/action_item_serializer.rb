# frozen_string_literal: true

class ActionItemSerializer < ActiveModel::Serializer
  attributes :id, :body, :times_moved, :status, :assignee_name, :assignee_avatar_url
  has_one :assignee

  def assignee_name
    object.assignee.email.split('@')[0] if object.assignee
  end

  def assignee_avatar_url
    object.assignee.avatar.thumb.url if object.assignee
  end
end
