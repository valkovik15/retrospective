# frozen_string_literal: true

module API
  class CardPolicy < ApplicationPolicy
    def update?
      check?(:user_is_author?)
    end

    def destroy?
      check?(:user_is_author?)
    end

    def user_is_author?
      record.author?(user)
    end
  end
end
