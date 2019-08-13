# frozen_string_literal: true

class Team < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :boards

  validates_presence_of :name
end
