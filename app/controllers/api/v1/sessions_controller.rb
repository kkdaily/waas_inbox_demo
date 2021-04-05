class Api::V1::SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      login @user

      render json: {
        logged_in: true,
        user: @user
      }
    else
      render json: {
        status: 401,
        errors: ['Invalid username or password.']
      }
    end
  end

  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'User not found.'
      }
    end
  end

  def destroy
    logout
    render json: {
      status: 200,
      logged_out: true
    }
  end

  def show
    @user = current_user
    render json: @user, status: :ok
  end

  private

    def session_params
      params.require(:user).permit(:username, :password)
    end
end
