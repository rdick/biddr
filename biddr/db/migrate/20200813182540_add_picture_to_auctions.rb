class AddPictureToAuctions < ActiveRecord::Migration[6.0]
  def change
    add_column :auctions, :picture, :text
  end
end
