class SuccessSerializer < Representable::Decorator
  include Representable::JSON

  property :data, exec_context: :decorator
  property :meta, exec_context: :decorator

  def initialize(result, serializer:)
    @serializer = serializer

    super(result)
  end

  def data
    @serializer.new(represented).to_hash
  end
  
  def meta
    represented.meta || {}
  end
end
