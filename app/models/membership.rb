# frozen_string_literal: true

class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :board

  enum role: { creator: 'creator', member: 'member' }
end
