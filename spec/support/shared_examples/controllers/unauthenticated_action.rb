# frozen_string_literal: true

RSpec.shared_examples 'an unauthenticated action' do
  it { is_expected.to have_http_status(:found) }
end
