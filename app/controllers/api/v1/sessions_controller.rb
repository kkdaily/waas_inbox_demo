class Api::V1::SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      puts "logged in!"
      render json: @user, status: :created
      #redirect_to homepage
      #redirect_to @user
    else  
      puts "failed to login!"
      #render json: @user, status: :unprocessable_entity
      #redirect '/fail'
      #redirect_to login_path
    end
  end

  def show
    @user = User.find(session[:user_id])
    render json: @user, status: :ok
  end

  def destroy
    session[:user_id] = nil
  end

end
