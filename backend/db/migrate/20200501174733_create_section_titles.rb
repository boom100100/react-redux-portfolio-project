class CreateSectionTitles < ActiveRecord::Migration[6.0]
  def change
    create_table :section_titles do |t|
      t.string :name

      t.belongs_to :project

      t.timestamps
    end
  end
end
