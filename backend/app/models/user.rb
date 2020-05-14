class User < ApplicationRecord
  has_secure_password

  has_many :projects
  has_many :section_titles, through: :projects

  validates :email, presence: true
  validates :email, uniqueness: { case_sensitive: false }#, on: :create
  validates :password, presence: true
  validates :password, confirmation: true
end
