# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :avatar, :name

  def name
    object.email.split('@')[0]
  end
end
