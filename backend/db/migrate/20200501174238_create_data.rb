class CreateData < ActiveRecord::Migration[6.0]
  def change
    create_table :data do |t|
      t.string :name
      t.string :url
      t.string :description
      t.string :content

      t.string :type

      t.belongs_to :project
      t.belongs_to :section_title, optional: true
    end
  end
end
