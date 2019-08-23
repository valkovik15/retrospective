# frozen_string_literal: true

class AddPreviousBoardToBoard < ActiveRecord::Migration[5.2]
  def change
    add_reference :boards, :previous_board, foreign_key: { to_table: 'boards' }
  end
end
