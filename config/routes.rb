# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :boards do
    resources :cards
    resources :action_items
    resources :memberships
  end

  resources :teams
end
