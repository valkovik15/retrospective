# frozen_string_literal: true

class AddSlugToBoards < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :slug, :string
  end
end
