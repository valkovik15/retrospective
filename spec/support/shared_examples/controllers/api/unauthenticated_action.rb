# frozen_string_literal: true

RSpec.shared_examples :controllers_api_unauthenticated_action do
  it { is_expected.to have_http_status(:found) }
end
