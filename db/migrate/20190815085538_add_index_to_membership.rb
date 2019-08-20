# frozen_string_literal: true

class AddIndexToMembership < ActiveRecord::Migration[5.2]
  def change
    add_index :memberships, %i[user_id board_id], unique: true
  end
end
