# frozen_string_literal: true

RSpec.shared_examples 'an unauthorized action' do
  it { is_expected.to have_http_status(:unauthorized) }
end
