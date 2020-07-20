# frozen_string_literal: true

module Types
  class CardAttributes < Types::BaseInputObject
    description 'Attributes for creating or updating card'

    argument :kind, String, required: false
    argument :body, String, required: false
    argument :board_slug, String, required: false
  end
end
