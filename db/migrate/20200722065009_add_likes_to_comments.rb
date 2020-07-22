# frozen_string_literal: true

class AddLikesToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :likes, :integer, default: 0
  end
end
