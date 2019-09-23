# frozen_string_literal: true

module API
  class BoardPolicy < ApplicationPolicy
    def suggestions?
      check?(:user_is_member?)
    end

    def invite?
      check?(:user_is_member?)
    end

    def user_is_member?
      record.member?(user)
    end
  end
end
