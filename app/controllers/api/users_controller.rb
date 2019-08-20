# frozen_string_literal: true

module API
  class UsersController < ApplicationController
    before_action :authenticate_user!

    def suggestions
      users = User.where('email LIKE ?', "#{params[:autocomplete]}%")
                  .or(User.where('uid LIKE ?', "#{params[:autocomplete]}%")).pluck(:email)
      render json: users
    end
  end
end
