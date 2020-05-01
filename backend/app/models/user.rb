class User < ApplicationRecord
  has_secure_password

  has_many :projects
  #unnecessary to do has_many :, through: : relationships
  #but they are obvious relationships to include here

  validates :email, presence: true
  validates :email, uniqueness: { case_sensitive: false }#, on: :create
  validates :password, presence: true
  validates :password, confirmation: true
end
