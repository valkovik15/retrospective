# frozen_string_literal: true

class TeamsController < ApplicationController
  def index
    @teams = Team.all
  end

  def show
    @team = Team.find(params[:id])
    @users = @team.users
  end
end
