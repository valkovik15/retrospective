# frozen_string_literal: true

module Boards
  class ApplicationController < ::ApplicationController
    before_action :set_board

    rescue_from ActionPolicy::Unauthorized do |ex|
      redirect_to @board, alert: ex.result.message
    end

    private

    def set_board
      @board = Board.find_by!(slug: params[:board_slug])
    end
  end
end
