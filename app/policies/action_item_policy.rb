# frozen_string_literal: true

class ActionItemPolicy < ApplicationPolicy
  def create?
    record.board.users.include?(user)
  end
end
