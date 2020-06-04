class Comment < ApplicationRecord
  belongs_to :card
  belongs_to :author, class_name: 'User'

  def author?(user)
    author == user
  end
end
