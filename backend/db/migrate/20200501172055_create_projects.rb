class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :abstract

      t.belongs_to :user

      t.timestamps
    end
  end
end
