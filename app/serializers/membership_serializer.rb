# frozen_string_literal: true

class MembershipSerializer < Representable::Decorator
  include Representable::JSON

  property :id
  property :ready
  property :user, decorator: UserSerializer
end
