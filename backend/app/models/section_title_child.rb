class SectionTitleChild < ApplicationRecord
  validates :name, presence: true
  
  validates :child_order, presence: true

  belongs_to :section_title
end
