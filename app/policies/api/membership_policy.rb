# frozen_string_literal: true

module API
  class MembershipPolicy
    include ActionPolicy::Policy::Core
    include ActionPolicy::Policy::Authorization
    include ActionPolicy::Policy::Reasons

    authorize :membership, allow_nil: true

    def index?
      check?(:role_is_member?)
    end

    def ready_status?
      check?(:role_is_member?)
    end

    def ready_toggle?
      check?(:role_is_member?)
    end

    def destroy?
      check?(:role_is_creator?) && !record.creator?
    end

    def role_is_member?
      membership&.member? || role_is_creator?
    end

    def role_is_creator?
      membership&.creator? || false
    end
  end
end
