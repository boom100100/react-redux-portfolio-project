class SectionTitle < ApplicationRecord
  belongs_to :project

  has_many :data
  has_many :graphs
end
