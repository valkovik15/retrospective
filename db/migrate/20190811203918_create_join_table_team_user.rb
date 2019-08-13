# frozen_string_literal: true

class CreateJoinTableTeamUser < ActiveRecord::Migration[5.2]
  def change
    create_join_table :teams, :users, column_options: { foreign_key: true } do |t|
      t.index %i[team_id user_id]
      t.index %i[user_id team_id]
    end
  end
end
