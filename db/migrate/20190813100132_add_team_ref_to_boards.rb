# frozen_string_literal: true

class AddTeamRefToBoards < ActiveRecord::Migration[5.2]
  def change
    add_reference :boards, :team, foreign_key: true
  end
end
