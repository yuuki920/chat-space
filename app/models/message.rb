class Message < ApplicationRecord
  bilongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
end