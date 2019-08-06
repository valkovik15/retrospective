# frozen_string_literal: true

class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.references :creator, foreign_key: { to_table: 'users' }

      t.timestamps
    end
  end
end
