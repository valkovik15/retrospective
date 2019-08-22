# frozen_string_literal: true

class AddSlugToBoards < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :slug, :string, null: false
    add_index :boards, :slug, unique: true
  end
end
