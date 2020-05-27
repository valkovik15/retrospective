module BroadcastActions
  extend ActiveSupport::Concern

  def broadcast_card(action_name, slug, resource)
    ActionCable.server.broadcast "board_#{params[:board_slug]}",
                                    front_action: action_name,
                                    card: ActiveModelSerializers::SerializableResource.new(resource).as_json

  end

  def broadcast_membership(action_name, slug)
    ActionCable.server.broadcast "board_#{params[:board_slug]}",
                                 front_action: action_name,
                                    card: ActiveModelSerializers::SerializableResource.new(resource).as_json

  end
end
