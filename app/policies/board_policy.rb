# frozen_string_literal: true

class BoardPolicy < ApplicationPolicy
  def index?
    true
  end

  def new?
    true
  end

  def edit?
    user_is_creator?
  end

  def create?
    true
  end

  def update?
    user_is_creator?
  end

  def destroy?
    user_is_creator?
  end

  def continue?
    user_is_creator?
  end

  def user_is_creator?
    record.creator?(user)
  end
end
