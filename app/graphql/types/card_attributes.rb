module Types
  class CardAttributes < Types::BaseInputObject
    description "Attributes for creating or updating card"

    argument :id, ID, required: false
    argument :kind, String, required: false
    argument :body, String, required: false
    argument :author_id, ID, required: false
    argument :board_id, ID, required: false
  end
end
