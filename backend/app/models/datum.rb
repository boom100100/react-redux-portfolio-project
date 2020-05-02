class Datum < SectionTitleChild
  validates :name, presence: true
  validates :url, presence: true
  validates :presence, presence: true
  validates :content, presence: true
  validates :type, presence: true
end
