class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  include SessionsHelper

  def authorized
    unless logged_in?
      render json: {
        status: 401,
        errors: ['Unauthorized. Please login.']
      }
    end
  end

end
