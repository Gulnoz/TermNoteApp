class NotesController < ApplicationController

    def create
  note=Note.update(note_params)
  render json: note
    end

    def update
  note=Note.update(note_params)
  render json: note
    end

    def show
    note=Note.find_by(param[:id])
    render json: note
    end

    def index
    notes=Note.all
    render json: notes
    end


    private
    def node_params
        params.permit(:description, :word_id)
    end
end
