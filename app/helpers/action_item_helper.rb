# frozen_string_literal: true

module ActionItemHelper
  def background(status)
    case status
    when 'closed'
      'has-background-danger'
    when 'done'
      'has-background-success'
    end
  end
end
