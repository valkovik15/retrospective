# frozen_string_literal: true

class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :kind, null: false
      t.text :body, null: false
      t.references :author, foreign_key: { to_table: 'users' }
      t.references :board, foreign_key: true

      t.timestamps
    end
  end
end
