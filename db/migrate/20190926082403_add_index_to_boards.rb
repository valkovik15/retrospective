# frozen_string_literal: true

class AddIndexToBoards < ActiveRecord::Migration[5.2]
  def up
    remove_index :boards, :previous_board_id
    add_index :boards, :previous_board_id, unique: true
  end

  def down
    remove_index :boards, :previous_board_id
    add_index :boards, :previous_board_id
  end
end
