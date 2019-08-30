# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :authenticate_user!
  skip_verify_authorized

  def index; end
end
