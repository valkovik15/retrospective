# frozen_string_literal: true

RSpec.shared_examples 'a successful action' do |code = :ok|
  it { is_expected.to have_http_status(code) }
end
