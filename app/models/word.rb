require 'unirest'

class Word < ApplicationRecord
  belongs_to :user
  has_many :notes

  def self.request_word(word)
    response = Unirest.get "https://wordsapiv1.p.rapidapi.com/words/#{word}",
      headers:{
        "X-RapidAPI-Host" => "wordsapiv1.p.rapidapi.com",
        "X-RapidAPI-Key" => "aa20248760msh1c4f23b66ef7462p148d17jsn43c5769c9e8b"
      }
    return response
  end
end
