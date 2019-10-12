# frozen_string_literal: true

class BoardsController < ApplicationController
  before_action :set_board, only: %i[show continue edit update destroy]
  skip_before_action :authenticate_user!, only: :show
  skip_verify_authorized only: :show

  rescue_from ActionPolicy::Unauthorized do |ex|
    redirect_to boards_path, alert: ex.result.message
  end

  def index
    authorize!
    @boards = current_user.boards.order(created_at: :desc)
  end

  # rubocop: disable Metrics/AbcSize
  def show
    @cards_by_type = {
      mad: @board.cards.mad.includes(:author),
      sad: @board.cards.sad.includes(:author),
      glad: @board.cards.glad.includes(:author)
    }
    @action_items = @board.action_items
    @action_item = ActionItem.new(board_id: @board.id)

    @previous_action_items = if @board.previous_board&.action_items&.any?
                               @board.previous_board.action_items
                             end
  end
  # rubocop: enable Metrics/AbcSize

  def new
    authorize!
    @board = Board.new(title: Date.today.strftime('%d-%m-%Y'))
  end

  def edit
    authorize! @board
  end

  def create
    authorize!
    @board = Board.new(board_params)
    @board.memberships.build(user_id: current_user.id, role: 'creator')

    if @board.save
      redirect_to @board, notice: 'Board was successfully created.'
    else
      render :new
    end
  end

  def update
    authorize! @board
    if @board.update(board_params)
      redirect_to boards_path, notice: 'Board was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    authorize! @board
    if @board.destroy
      redirect_to boards_path, notice: 'Board was successfully deleted.'
    else
      redirect_to boards_path, alert: @board.errors.full_messages.join(', ')
    end
  end

  def continue
    authorize! @board
    result = Domains::Boards::Operations::Continue.new(@board, current_user).call
    if result.success?
      redirect_to result.value!, notice: 'Board was successfully created.'
    else
      redirect_to boards_path, alert: result.failure
    end
  end

  private

  def board_params
    params.require(:board).permit(:title, :team_id, :email)
  end

  def set_board
    @board = Board.find_by!(slug: params[:slug])
  end
end
