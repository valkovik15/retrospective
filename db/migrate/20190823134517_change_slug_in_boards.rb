# frozen_string_literal: true

class ChangeSlugInBoards < ActiveRecord::Migration[5.2]
  def change
    populate_board_slugs

    change_column_null(:boards, :slug, false)
    add_index :boards, :slug, unique: true
  end

  def populate_board_slugs
    Board.where(slug: nil).each { |board| board.set_slug.save }
  end
end

class Board < ApplicationRecord
  def set_slug
    loop do
      self.slug = Nanoid.generate(size: 10)
      break unless Board.where(slug: slug).exists?
    end
    self
  end
end
