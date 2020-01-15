module Types
  class CardAttributes < Types::BaseInputObject
    description "Attributes for creating or updating card"

    argument :kind, String, required: true
    argument :body, String, required: true
    argument :author_id, ID, required: true
    argument :board_id, ID, required: true
  end
end