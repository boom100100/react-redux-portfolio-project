class CreateGraphs < ActiveRecord::Migration[6.0]
  def change
    create_table :graphs do |t|
      t.string :name
      t.string :url
      t.string :description

      t.belongs_to :project
      t.belongs_to :section_title, optional: true
    end
  end
end
