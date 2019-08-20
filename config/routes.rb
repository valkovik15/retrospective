# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :boards do
    resources :cards
    resources :action_items
    resources :memberships do
      collection do
        get 'ready_status'
        get 'ready_toggle'
      end
    end
  end

  resources :teams

  namespace :api do
    get 'users/suggestions'
    resources :boards do
      member do
        post 'invite'
      end
      resources :memberships, only: [:index] do
        collection do
          get 'ready_status'
          get 'ready_toggle'
        end
      end
    end
  end
end
# rubocop:enable Metrics/BlockLength
