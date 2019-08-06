# frozen_string_literal: true

class Card < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :board

  validates_presence_of :kind, :body
  validates :kind, inclusion: { in: %w[mad sad glad] }
end
