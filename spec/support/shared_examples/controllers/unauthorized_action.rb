# frozen_string_literal: true

RSpec.shared_examples :controllers_unauthorized_action do
  it { expect { subject }.to raise_error(ActionPolicy::Unauthorized) }
end
