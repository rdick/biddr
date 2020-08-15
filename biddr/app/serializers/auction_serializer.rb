class AuctionSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :title,
    :description,
    :ends_at,
    :reserve_price, 
    :created_at,
    :picture
  )
  
  belongs_to :user, key: :author
  has_many :bids
  end
