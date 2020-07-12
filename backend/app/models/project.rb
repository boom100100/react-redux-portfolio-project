class Project < ApplicationRecord
  belongs_to :user

  has_many :section_titles, dependent: :destroy

  has_many :data, through: :section_title
  has_many :graphs, through: :section_title
end
