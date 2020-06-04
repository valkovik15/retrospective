# frozen_string_literal: true

module API
  module Cards
    class CommentsPolicy < ApplicationPolicy
      authorize :board, allow_nil: true

      def create?
        check?(:user_is_creator?)
      end

      def user_is_creator?
        record.author?(user)
      end
    end
  end
end
