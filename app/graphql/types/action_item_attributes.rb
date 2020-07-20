# frozen_string_literal: true

module Types
  class ActionItemAttributes < Types::BaseInputObject
    description 'Attributes for creating or updating action item'

    argument :status, String, required: false
    argument :body, String, required: false
    argument :assignee_id, ID, required: false
    argument :board_slug, String, required: false
  end
end
