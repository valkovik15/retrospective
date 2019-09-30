# frozen_string_literal: true

RSpec.shared_examples :controllers_render do |view|
  it { is_expected.to have_http_status(:ok) }
  it { is_expected.to render_template(view) }
end
