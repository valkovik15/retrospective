# frozen_string_literal: true

RSpec.shared_examples :controllers_api_unauthorized_action do
  it { is_expected.to have_http_status(:unauthorized) }
end
