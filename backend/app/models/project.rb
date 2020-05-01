class Project < ApplicationRecord
  belongs_to :user

  has_many :section_titles

  has_many :data
  has_many :graphs
end
