# frozen_string_literal: true

module Resultable
  Result = Struct.new(:value, :error, :success?, keyword_init: true)

  # rubocop: disable  Naming/MethodName
  def Success(value)
    Result.new(value: value, success?: true)
  end

  def Failure(error)
    Result.new(error: error, success?: false)
  end
  # rubocop: enable  Naming/MethodName
end
