# frozen_string_literal: true

class Board < ApplicationRecord
  has_many :action_items
  has_many :cards
  has_many :memberships
  has_many :users, through: :memberships
  validates_presence_of :title
end
