class PaginatedCollection < Dry::Struct
  attribute :data, Types::Array
  attribute :meta, Types::Hash.default({})
end
