# frozen_string_literal: true

class ActionItem < ApplicationRecord
  belongs_to :board

  validates_presence_of :body, :status
end
