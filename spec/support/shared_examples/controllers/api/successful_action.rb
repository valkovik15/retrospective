# frozen_string_literal: true

RSpec.shared_examples :controllers_api_successful_action do |code = :ok|
  it { is_expected.to have_http_status(code) }
end
