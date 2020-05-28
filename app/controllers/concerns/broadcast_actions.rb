# frozen_string_literal: true

module BroadcastActions
  extend ActiveSupport::Concern

  def broadcast_card(action_name, slug, resource)
    ActionCable.server.broadcast "board_#{slug}",
                                 front_action: action_name,
                                 card: ActiveModelSerializers::SerializableResource.new(resource).as_json
  end

  def broadcast_membership(action_name, slug, membership)
    ActionCable.server.broadcast "board_#{slug}",
                                 front_action: action_name,
                                 id: membership.id
  end
end
