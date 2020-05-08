class UsersController < ApplicationController
  # TODO: can probably remove.
  #will need to query user for sign in - only likely use case
  def index
    @users = User.all
    if @users
      render :json => @users, only: [:email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
      #render :json => @users, only: [:email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]
    else
      render json: {
        status: 500,
        message: 'No users found.'
      }
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    render :json => @user, only: [:email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
  end
=begin
  def new
    @user = User.new
  end
  def edit
  end
=end
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render :json => user, only: [:email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
    else
      render json: {
        message: 'Creating user failed.'
      }, status: 500
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      render render :json => user, only: [:email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
    else
      render json: {
        message: 'Editing user failed.'
      }, status: 500
    end
  end
  def destroy
    @user = User.find_by(id: params[:id])
    if @user.destroy
      render json: {
        status: 200,
        message: 'Deleting user succeeded.'
      }
    else
      render json: {
        status: 500,
        message: 'Deleting user failed.'
      }
    end
  end
  private
  def user_params
    params.permit(:email, :password, :password_confirmation)
  end
end
