# frozen_string_literal: true

class MembershipSerializer < ActiveModel::Serializer
  attributes :ready
  belongs_to :user
end
