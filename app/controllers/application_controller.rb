# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_raven_context
  before_action :authenticate_user!, except: %i[sign_in sign_up]
  authorize :user, through: :current_user
  verify_authorized unless: [:devise_controller?]

  private

  def set_raven_context
    Raven.user_context(id: current_user.id) if current_user
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
