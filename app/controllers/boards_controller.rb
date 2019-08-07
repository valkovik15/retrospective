# frozen_string_literal: true

class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = Board.all
  end

  def new
    @board = Board.new(title: Date.today.strftime('%d-%m-%Y'))
  end

  def create
    @board = Board.new(board_params)
    @board.creator_id = current_user.id
    if @board.save
      redirect_to @board, notice: 'Board was successfully created.'
    else
      render :new
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
