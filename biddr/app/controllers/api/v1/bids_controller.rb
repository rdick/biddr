class Api::V1::BidsController < Api::ApplicationController


    def create 
        bid = Bid.new params.require(:bid).permit(:price, :auction_id)
        bid.user = current_user
        if bid.save
            render(json: { id: bid.auction })
        else
            render(
              json: { errors: bid.errors, status: 422} 
            )
        end
    end


end
