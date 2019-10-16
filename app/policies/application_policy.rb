# frozen_string_literal: true

class ApplicationPolicy < ActionPolicy::Base
  authorize :user
end
