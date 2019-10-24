# frozen_string_literal: true

class AddTimesMovedToActionItems < ActiveRecord::Migration[6.0]
  def change
    add_column :action_items, :times_moved, :integer, default: 0, null: false
  end
end
