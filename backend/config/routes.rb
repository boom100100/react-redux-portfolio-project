Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  delete '/sessions/delete', to: 'sessions#destroy'
  resources :sessions, only: [:create]
  resources :users, except: [:new, :edit]
end
