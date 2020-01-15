module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :boards,
      [Types::BoardType],
      null: false,
      description: "Returns a list of boards"
    
    field :users,
      [Types::UserType],
      null: false,
      description: "Returns a list of users"
    
    def boards
      Board.all
    end

    def users
      User.all
    end
  end
end
