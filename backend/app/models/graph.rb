class Graph < SectionTitleChild
  validates :content, presence: false

  validates :type, presence: true
end
