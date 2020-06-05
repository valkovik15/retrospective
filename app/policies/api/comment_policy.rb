# frozen_string_literal: true

module API
  class CommentPolicy < ApplicationPolicy
    def create?
      check?(:user_is_member?)
    end

    def user_is_member?
      record.card.board.member?(user)
    end
  end
end
