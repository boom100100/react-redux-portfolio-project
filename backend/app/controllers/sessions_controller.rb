class SessionsController < ApplicationController
  #skip_before_action :set_csrf_cookie, only: [:create]
  def new
    render json: {token: cookies["CSRF-TOKEN"]}
  end

  def create

    user = User.find_by(email: params[:email])

    authenticated = user.try(:authenticate, params[:password])
    return render json: {message: "Login failed."}, status: 403 unless authenticated
    #user.try(:authenticate, params[:password])


    session[:user_id] = user.id
    # TODO: how to securely send and store cookie?
    render json: {data:{user: user.email}}

  end

  def destroy
    reset_session
    render json: {message: 'Session was ended.'}
  end
end
