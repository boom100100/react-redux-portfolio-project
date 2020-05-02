class SessionsController < ApplicationController
  def create
    @user = User.find_by(id: params[:id])
    if @user
      #render :json => @users, include: [:projects => {:include => [:section_titles, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]
    else
      # render json: {
      #   status: 500,
      #   message: 'No users found.'
      # }
    end
  end

  def destroy
  end
end
