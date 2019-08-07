# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = [
  { email: 'tu1@mail.com', password: '123456' },
  { email: 'tu2@mail.com', password: '123456' },
  { email: 'tu3@mail.com', password: '123456' },
  { email: 'tu4@mail.com', password: '123456' },
  { email: 'tu5@mail.com', password: '123456' }
]

boards = [
  { title: 'TestUser1_RetroBoard', creator_id: 1 },
  { title: 'TestUser2_RetroBoard', creator_id: 2 },
  { title: 'TestUser3_RetroBoard', creator_id: 3 },
  { title: 'TestUser4_RetroBoard', creator_id: 4 },
  { title: 'TestUser5_RetroBoard', creator_id: 5 }
]

cards = [
  { kind: 'mad', body: 'user1 is very mad', author_id: 1, board_id: 1 },
  { kind: 'sad', body: 'user1 is very sad', author_id: 1, board_id: 1 },
  { kind: 'glad', body: 'user1 is very glad #1', author_id: 1, board_id: 1 },
  { kind: 'glad', body: 'user1 is very glad #2', author_id: 1, board_id: 1 },
  { kind: 'sad', body: 'user2 is very sad', author_id: 2, board_id: 1 },
  { kind: 'mad', body: 'user3 is very mad', author_id: 3, board_id: 1 },
  { kind: 'mad', body: 'user4 is very mad', author_id: 4, board_id: 1 },
  { kind: 'mad', body: 'user5 is very mad', author_id: 5, board_id: 1 }
]

action_items = [
  { body: 'issue should be fixed', board_id: 1 },
  { body: 'meetings should be held', board_id: 1 },
  { body: 'actions should be taken', board_id: 1 }
]

users.each do |u|
  User.create(u)
end

boards.each do |b|
  Board.create(b)
end

cards.each do |c|
  Card.create(c)
end

action_items.each do |a|
  ActionItem.create(a)
end
