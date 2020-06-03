class SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:email])

    authenticated = user.try(:authenticate, params[:password])
    return render json: {message: "Login failed."}, status: 403 unless authenticated

    session[:user_id] = user.id
    render json: user, only: [:id, :email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :child_order, :content, :section_title_id, :section_order]}]}]}]
    #render :json => user, only: [:email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]
  end

  def destroy
    reset_session
    render json: {message: 'Session was ended.'}
  end
end
