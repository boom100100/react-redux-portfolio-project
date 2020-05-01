class User < ApplicationRecord
  has_secure_password

  has_many :projects
  #unnecessary to do has_many :, through: : relationships
  #but they are obvious relationships to include here
end
