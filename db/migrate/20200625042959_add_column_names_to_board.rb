# frozen_string_literal: true

class AddColumnNamesToBoard < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :column_names, :text, array: true, default: %w[mad sad glad]
  end
end
