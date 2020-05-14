class UsersController < ApplicationController
  # TODO: can probably remove.
  #will need to query user for sign in - only likely use case
  def index
    @users = User.all
    if @users
      render :json => @users, only: [:id, :email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
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
    render :json => @user, only: [:id, :email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
  end

  def create
    if (user = User.create(email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation]))
      session[:user_id] = user.id
      render :json => user, only: [:id, :email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]#, :graphs, :data => {:only => [:name, :type, :url, :description, :content]}]}]}
    else
      render json: {
        message: 'Creating user failed.'
      }, status: 500
    end
  end

  def update
    #default behavior of rake route is to add :id key.
    #implementation ignores that key
    @user = User.find_by(email: params[:current_email])
    #current_password is current password's key name
    #current_email is current email's key name

    if @user
      if @user.authenticate(params[:current_password])

        updateables_hash = nil

        if params[:email] != '' && params[:password] == '' && params[:password_confirmation] == ''
          #only update email address
          updateables_hash = {email: params[:email], password: params[:current_password]}
        elsif params[:email] == '' && params[:password] == params[:password_confirmation]
          #only update password
          updateables_hash = {email: params[:current_email], password: params[:password]}
        elsif params[:password] == params[:password_confirmation]
          #update email and password
          updateables_hash = {email: params[:email], password: params[:password]}
        end
        #other conditions will leave updateables_hash as nil, causing rendered error detailed in update_user

        update_user(@user, updateables_hash)

      else
        render json: {
          message: 'Username/password combination failed.'
        }, status: 403
      end
    else
      render json: {
        message: 'User not found.'
      }, status: 404
    end
  end

  def destroy
    @user = User.find_by(email: params[:email])
    projects = @user.projects
    if @user.destroy
      projects.each {|project|
        project.data.destroy_all if project.data
        project.graphs.destroy_all if project.graphs
        project.section_titles.destroy_all if project.section_titles
        project.destroy
      }

      render json: {
        message: 'Deleting user succeeded.'
      }, status: 200
    else
      render json: {
        message: 'Deleting user failed.'
      }, status: 500
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

  def editing_failed
    render json: {
      message: 'Editing user failed.'
    }, status: 500
  end

  def update_user(user, updateables_hash)
    if user.update(updateables_hash)
      render :json => user, only: [:id, :email], include: [:projects => {:include => [:section_titles=> {:include => [:section_title_children => {:only => [:name, :type, :url, :description, :obj_order, :content]}]}]}]
    else
      editing_failed
    end
  end
end
