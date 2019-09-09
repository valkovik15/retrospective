# frozen_string_literal: true

module API
  class CardPolicy < ApplicationPolicy
    def destroy?
      record.author == user
    end
  end
end
