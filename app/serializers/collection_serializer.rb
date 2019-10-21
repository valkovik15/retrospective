class CollectionSerializer < Representable::Decorator
  include Representable::JSON

  property :data, exec_context: :decorator
  property :meta, exec_context: :decorator

  def initialize(result, serializer:)
    @serializer = serializer

    super(result)
  end

  def data
    @serializer.for_collection.new(represented.data).to_hash
  end

  def meta
    represented.meta
  end
end
