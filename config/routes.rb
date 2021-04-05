Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'conversations', to: 'messages#index'
      get 'conversations/:id', to: 'messages#show'
      post 'messages', to: 'messages#create'

      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      get 'logged_in', to: 'sessions#is_logged_in?'
    end
  end

  # Let React Router handle rendering views by path
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
