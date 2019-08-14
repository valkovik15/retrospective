# frozen_string_literal: true

class RemoveTeamFromBoard < ActiveRecord::Migration[5.2]
  def change
    remove_reference :boards, :team, index: true, foreign_key: true
  end
end
