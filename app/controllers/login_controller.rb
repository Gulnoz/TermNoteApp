class LoginController < ApplicationController
   #before_action :signout, only: [:new]
    
    def create
    
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
            #set session["user_id"]
            session["user_id"] = user.id
            flash[:message] = "Welcome back, #{user.name}!"
            render json: user.id

        else
            flash[:message] = "Incorrect email or password"
            render json: flash[:message]
        end
    end
        
end
