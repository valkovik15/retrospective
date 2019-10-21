module Serialize
  def serialize_success(value:, with:, serializer: SuccessSerializer, status: 200)
    {
      status: status,
      json: serializer.new(value, serializer: with)
    }
  end
end
