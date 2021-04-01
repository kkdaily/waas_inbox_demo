Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      # get 'messages', to: 'messages#index'
      # get 'messages/users/:user_id', to: 'messages#show'
      get 'conversations', to: 'conversations#index'
      get 'conversations/:id', to: 'conversations#show'
      post 'messages', to: 'messages#create'

      #get "login", to: "sessions#new"
      post "sessions", to: "sessions#create"
      get "sessions", to: "sessions#destroy"
      get "sessions/user", to: "sessions#show"
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
