class AddAppointedToActionItem < ActiveRecord::Migration[6.0]
  def change
    add_reference :action_items, :appointed, foreign_key: { to_table: 'users' }
  end
end
