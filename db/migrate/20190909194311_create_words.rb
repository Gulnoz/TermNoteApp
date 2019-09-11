class CreateWords < ActiveRecord::Migration[5.2]
  def change
    create_table :words do |t|
      t.string :name
      t.string :imgurl
      t.string :definition
      t.string :example
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
