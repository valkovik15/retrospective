# frozen_string_literal: true

class CardPolicy < ApplicationPolicy
  def create?
    check?(:user_is_member?)
  end

  def user_is_member?
    record.board.member?(user)
  end
end
