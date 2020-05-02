class SectionTitle < ApplicationRecord
  belongs_to :project

  has_many :data
  has_many :graphs

  #validations
  #doesn't have to be unique because there may be undefined titles

end
