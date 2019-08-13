# frozen_string_literal: true

class Board < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :team
  has_many :action_items
  has_many :cards

  validates_presence_of :title
end
