# frozen_string_literal: true

FactoryBot.define do
  factory :action_item do
    body { Faker::ChuckNorris.fact }
    association :board
    association :assignee, factory: :user
  end
end
