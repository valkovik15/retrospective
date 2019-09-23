# frozen_string_literal: true

class Board < ApplicationRecord
  has_many :action_items
  has_many :cards
  has_many :memberships
  has_many :users, through: :memberships
  validates_presence_of :title

  belongs_to :previous_board, class_name: 'Board', optional: true
  before_create :set_slug

  def to_param
    slug
  end

  def member?(user, role = %w[member creator])
    Membership.exists?(board_id: id, user_id: user.id, role: role)
  end

  def creator?(user)
    member?(user, 'creator')
  end

  private

  def set_slug
    loop do
      self.slug = Nanoid.generate(size: 10)
      break unless Board.where(slug: slug).exists?
    end
  end
end
