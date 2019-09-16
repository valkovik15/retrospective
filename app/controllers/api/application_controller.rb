# frozen_string_literal: true

module API
  class ApplicationController < ActionController::Base
    before_action :authenticate_user!
    authorize :user, through: :current_user
    verify_authorized

    rescue_from ActionPolicy::Unauthorized do |ex|
      render json: { error: ex.result.message }, status: :unauthorized
    end
  end
end
