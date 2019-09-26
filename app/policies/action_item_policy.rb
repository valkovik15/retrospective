# frozen_string_literal: true

class ActionItemPolicy < ApplicationPolicy
  authorize :board, allow_nil: true

  def create?
    check?(:user_is_creator?)
  end

  def move?
    check?(:user_is_creator?) && record.pending?
  end

  def close?
    check?(:user_is_creator?) && record.may_close?
  end

  def complete?
    check?(:user_is_creator?) && record.may_complete?
  end

  def reopen?
    check?(:user_is_creator?) && record.may_reopen?
  end

  def user_is_creator?
    board.creator?(user)
  end
end
