# frozen_string_literal: true

class CreateActionItems < ActiveRecord::Migration[5.2]
  def change
    create_table :action_items do |t|
      t.text :body, null: false
      t.references :board, foreign_key: true
      t.string :status, null: false, default: 'pending'

      t.timestamps
    end
  end
end
