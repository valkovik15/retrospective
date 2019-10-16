# frozen_string_literal: true

module ApplicationHelper
  def calc_life_span(obj)
    time_ago_in_words(obj.created_at)
  end
end
