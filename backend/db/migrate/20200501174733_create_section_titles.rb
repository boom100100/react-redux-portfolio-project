class CreateSectionTitles < ActiveRecord::Migration[6.0]
  def change
    create_table :section_titles do |t|
      t.string :name, :default => 'unnamed-' + :id.to_s
      t.integer :section_order
      t.belongs_to :project

      t.timestamps
    end
  end
end
