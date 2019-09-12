# frozen_string_literal: true

module API
  class CardPolicy < ApplicationPolicy
    def update?
      record.author == user
    end

    def destroy?
      record.author == user
    end
  end
end
