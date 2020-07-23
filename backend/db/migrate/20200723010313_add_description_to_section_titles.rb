class AddDescriptionToSectionTitles < ActiveRecord::Migration[6.0]
  def change
    add_column :section_titles, :description, :string
  end
end
