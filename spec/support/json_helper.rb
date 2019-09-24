# frozen_string_literal: true

module JSONHelper
  def json_body
    JSON.parse(response.body)
  end
end
