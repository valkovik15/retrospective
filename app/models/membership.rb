# frozen_string_literal: true

class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :board
  validates_uniqueness_of :user_id, scope: [:board_id]

  enum role: { creator: 'creator', member: 'member' }
end
