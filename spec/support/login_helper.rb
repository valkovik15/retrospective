# frozen_string_literal: true

module LoginHelper
  def login_as(user)
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    allow(controller).to receive(:current_user).and_return(user)
  end

  def authorize
    allow(controller).to receive(:authorize!).and_return(true)
    allow(controller).to receive(:verify_authorized).and_return(nil)
  end
end
