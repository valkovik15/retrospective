# frozen_string_literal: true

class TeamsController < ApplicationController
  skip_before_action :authenticate_user!
  skip_verify_authorized

  def index
    @teams = Team.all
  end

  def show
    @team = Team.find(params[:id])
    @users = @team.users
  end
end
