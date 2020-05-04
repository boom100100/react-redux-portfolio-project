class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    user.try(:authenticate, params[:password])

    return render json: {response: "Login failed."} unless user

    session[:user_id] = user.id
    render :json => session

  end

  def destroy
  end
end
