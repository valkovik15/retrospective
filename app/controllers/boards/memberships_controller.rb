# frozen_string_literal: true

module Boards
  class MembershipsController < Boards::ApplicationController
    skip_verify_authorized

    def create
      @membership = @board.memberships.build(user_id: current_user.id, role: :member)
      if @membership.save
        redirect_to @board, notice: "#{current_user.email.split('@').first} has joined the board!"
      else
        redirect_to @board, alert: @membership.errors.full_messages.join(', ')
      end
    end
  end
end
