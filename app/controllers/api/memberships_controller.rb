# frozen_string_literal: true

module API
  class MembershipsController < API::ApplicationController
    before_action :set_board, :set_membership
    before_action except: :index do
      authorize! @membership
    end
    skip_verify_authorized only: :index

    def index
      members = @board.memberships
      render json: members, each_serializer: MembershipSerializer
    end

    def destroy
      member = Membership.find(params[:id])
      if member.destroy
        head :no_content
      else
        render json: { error: member.errors }, status: :bad_request
      end
    end

    def ready_status
      render json: @membership.ready
    end

    def ready_toggle
      @membership.update(ready: !@membership.ready)
      render json: @membership.ready
    end

    private

    def membership_params
      params.require(:membership).permit(:email)
    end

    def set_board
      @board = Board.find_by!(slug: params[:board_slug])
    end

    def set_membership
      @membership = Membership.find_by(board_id: @board.id, user_id: current_user.id)
    end
  end
end
