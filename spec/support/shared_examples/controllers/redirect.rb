# frozen_string_literal: true

# rubocop:disable Security/Eval

RSpec.shared_examples :controllers_redirect do |path|
  include Rails.application.routes.url_helpers

  it { is_expected.to have_http_status(:redirect) }
  # controversial eval usage
  it { is_expected.to redirect_to(eval(path.to_s)) }
end

# rubocop:enable Security/Eval
