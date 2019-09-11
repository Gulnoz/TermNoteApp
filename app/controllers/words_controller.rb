class WordsController < ApplicationController
 
   before_action :autorized, only: [:index, :show, :update, :create, :destroy, :my_items]
   
    def requestword
        response = Word.request_word("dog")
        render json: response
    end

     def create
        word=Word.create(word_params)
     
        render json: word
    end

    def update
  word=Word.update(word_params)
   render json: word
    end

    def my_words
        words=@current_user.words
        render json: words
    end

    def show
    word=Word.find_by(name: param[:name])
    render json: word
    end

    def index
    words=Word.all
    render json: words
    end


    private
    def word_params
        
       params.permit(:name, :imgurl, :definition, :example, :user_id)
    end
       
end

