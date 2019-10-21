# frozen_string_literal: true

module API
  class BoardsController < API::ApplicationController
    include Serialize

    before_action :set_board

    before_action do
      authorize! @board
    end

    def invite
      users = Domains::Boards::Queries::FindUsersToInvite.new(board_params[:email], @board).call
      if users.any?
        result = Domains::Boards::Operations::InviteUsers.new(@board, users).call

        render serialize_success(
                 value: OffsetPagination.new.call(result.value!),
                 with: MembershipSerializer,
                 serializer: CollectionSerializer
               )
      else
        { error: 'User was not found' }, status: 400
      end
    end

    def suggestions
      result = Domains::Boards::Queries::Suggestions.new(params[:autocomplete]).call
      render serialize_success(
               value: OffsetPagination.new.call(result.value!),
               with: MembershipSerializer,
               serializer: CollectionSerializer
             )
    end

    private

    def board_params
      params.require(:board).permit(:email)
    end

    def set_board
      @board = Board.find_by!(slug: params[:slug])
    end
  end
end
