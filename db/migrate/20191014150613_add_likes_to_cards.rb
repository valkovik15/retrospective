# frozen_string_literal: true

class AddLikesToCards < ActiveRecord::Migration[6.0]
  def up
    add_column :cards, :likes, :integer, default: 0
  end

  def down
    remove_column :cards, :likes
  end
end
