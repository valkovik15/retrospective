# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :boards, param: :slug do
    member do
      post 'continue'
    end
    resources :cards
    resources :action_items
    resources :memberships
  end

  resources :teams

  namespace :api do
    resources :boards, param: :slug do
      member do
        post 'invite'
        get 'suggestions'
      end
      resources :memberships, only: [:index] do
        collection do
          get 'ready_status'
          get 'ready_toggle'
        end
      end
      resources :cards
    end
  end
end

# rubocop:enable Metrics/BlockLength
