# frozen_string_literal: true

module API
  class CommentPolicy < ApplicationPolicy
    authorize :board, allow_nil: true

    def create?
      check?(:user_is_creator?)
    end

    def user_is_creator?
      record.author?(user)
    end
  end
end
