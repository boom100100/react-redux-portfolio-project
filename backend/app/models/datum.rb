class Datum < SectionTitleChild
  validates :content, presence: true

  validates :type, presence: true
end
