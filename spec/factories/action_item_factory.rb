# frozen_string_literal: true

FactoryBot.define do
  factory :action_item do
    body { Faker::ChuckNorris.fact }
    association :board
    association :appointed, factory: :user
  end
end
