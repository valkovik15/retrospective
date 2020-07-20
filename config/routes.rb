# frozen_string_literal: true

Rails.application.routes.draw do
  # rubocop:disable Metrics/LineLength
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'
  root to: 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }, skip: :sessions
  as :user do
    delete '/sign_out' => 'devise/sessions#destroy', :as => :destroy_user_session
    # rubocop:enable Metrics/LineLength
  end
  # get '/boardsql', to: 'boardsql#show'

  resources :boards, param: :slug do
    member do
      post 'continue'
    end
  end

  resources :action_items, only: :index do
    member do
      put 'close'
      put 'complete'
      put 'reopen'
    end
  end

  resources :teams

  resources :boardsql, param: :slug, only: :show

  mount ActionCable.server, at: '/cable'
end
