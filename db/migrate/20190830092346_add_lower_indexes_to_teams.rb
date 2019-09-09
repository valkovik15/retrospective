# frozen_string_literal: true

class AddLowerIndexesToTeams < ActiveRecord::Migration[5.2]
  def up
    execute "CREATE UNIQUE INDEX index_teams_on_lowercase_name
             ON teams USING btree (lower(name));"
  end

  def down
    execute 'DROP INDEX index_teams_on_lowercase_name;'
  end
end
