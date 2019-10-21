# frozen_string_literal: true

class UserSerializer < Representable::Decorator
  include Representable::JSON

  property :email
end
