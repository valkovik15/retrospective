# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :boards, param: :slug do
      member do
        post 'invite'
        get 'suggestions'
      end
      resources :memberships, only: %i[index destroy] do
        collection do
          get 'ready_status'
          put 'ready_toggle'
        end
      end
      resources :cards do
        member do
          put 'like'
        end
      end
      resources :action_items, only: %i[update destroy] do
        member do
          post 'move'
          put 'close'
          put 'complete'
          put 'reopen'
        end
      end
    end
  end

  match '*path', to: 'pages#index', via: :all
end

# rubocop:enable Metrics/BlockLength
