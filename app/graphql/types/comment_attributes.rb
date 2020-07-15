# frozen_string_literal: true

module Types
  class CommentAttributes < Types::BaseInputObject
    description 'Attributes for creating or updating comment'

    argument :content, String, required: false
    argument :card_id, ID, required: false
  end
end
