module SessionsHelper

  def login(user)
    session[:user_id] = user.id
  end

  def current_user
    if session[:user_id]
      User.find_by(id: session[:user_id])
    end
  end

  def logged_in?
    !!session[:user_id]
  end

  def logout
    reset_session
  end

end
