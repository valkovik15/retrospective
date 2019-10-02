# frozen_string_literal: true

module API
  class ActionItemPolicy < ApplicationPolicy
    def update?
      check?(:user_is_creator?)
    end

    def destroy?
      check?(:user_is_creator?)
    end

    def user_is_creator?
      record.board.creator?(user)
    end
  end
end
