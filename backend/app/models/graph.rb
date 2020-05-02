class Graph < SectionTitleChild
  validates :name, presence: true
  validates :url, presence: true
  validates :presence, presence: true
  validates :obj_order, presence: true
  validates :content, presence: false
  
  validates :type, presence: true
end
