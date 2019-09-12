class WordsController < ApplicationController
 
#    before_action :autorized, only: [:index, :show, :update, :create, :destroy, :my_items]
   
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
        words=User.find(params[:id]).words
        render json: words
    end

    def show
    word=Word.find(params[:id])
    
    render json: word
    end

    def index
    words=Word.all
    render json: words
    end

    def destroy
    Word.delete(params[:id])
    
    render json: {word: 'deleted'}
    end

    private
    def word_params
        
       params.permit(:name, :imgurl, :definition, :example, :user_id)
    end
    def show_params
        params.permit(:id)
    end

       
end

