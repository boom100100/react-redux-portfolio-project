class CreateSectionTitleChildren < ActiveRecord::Migration[6.0]
  def change
    create_table :section_title_children do |t|
      t.string :name
      t.string :url
      t.string :description
      t.string :content, :null => true

      t.integer :child_order

      t.string :type

      t.belongs_to :section_title

      t.timestamps
    end
  end
end
