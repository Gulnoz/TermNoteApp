class UsersController < ApplicationController

    def create
    user=User.create(user_params)
    render json: user
    end

    def update
         user=User.update(user_params)
         render json: user
    end

    private
    def user_params
        params.permit(:name, :email, :password)
    end

end
