Rails.application.routes.draw do
  resources :notes
  resources :words
  resources :users
  # get '/requestword', to: 'words#requestword'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
get '/my_words', to: 'words#my_words'

end
