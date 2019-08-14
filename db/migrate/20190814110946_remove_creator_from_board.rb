# frozen_string_literal: true

class RemoveCreatorFromBoard < ActiveRecord::Migration[5.2]
  def change
    remove_reference :boards, :creator, foreign_key: { to_table: 'users' }
  end
end
