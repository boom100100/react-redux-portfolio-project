class SectionTitle < ApplicationRecord
  belongs_to :project

  has_many :section_title_children

  #validations
  #has to be unique
  #there may be undefined titles
  #but user must be able to differentiate
  #default = 'unnamed' + id.to_s
  validates :name, presence: true

end
