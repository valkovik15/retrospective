# frozen_string_literal: true

module LoginHelper
  def login_as(user)
    @request.env['devise.mapping'] = Devise.mappings[:user]
    sign_in user
  end
end
