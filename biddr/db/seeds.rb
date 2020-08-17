# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Bid.delete_all 
Auction.delete_all
User.delete_all
NUM_AUCTION = 5
NUM_USER = 5
PASSWORD = '1'

super_user = User.create(
    email: '1@1.1',
    password: PASSWORD
)
NUM_USER.times do
    User.create(
        email: Faker::Internet.email,
        password: PASSWORD
    )
end
users = User.all
NUM_AUCTION.times do 
    created_at = Faker::Date.backward(days: 30 )
    a = Auction.create(
        title: Faker::Vehicle.make_and_model,
        description: Faker::ChuckNorris.fact,
        ends_at: Faker::Date.forward(days: 30*1),
        user: users.sample, 
        reserve_price: Faker::Number.between(from:500, to:1000),
        created_at: created_at,
        updated_at: created_at,
        picture: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    )
    if a.valid? 
        a.bids = rand(0..5).times.map do 
          Bid.new(price: Faker::Number.between(from:50, to:501) , user: users.sample)
        end
    end
end
puts "Created #{User.count} users"
puts "Created #{Auction.count} Auctions"
puts "Created #{Bid.count} bids"