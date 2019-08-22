# frozen_string_literal: true

class CardsController < ApplicationController
  before_action :set_board

  def create
    @board.cards.create(card_params.merge(author_id: current_user.id))
    redirect_to @board
  end

  private

  def card_params
    params.require(:card).permit(:kind, :body)
  end

  def set_board
    @board = Board.find_by!(slug: params[:board_slug])
  end
end
