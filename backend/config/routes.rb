Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  delete '/sessions/delete', to: 'sessions#destroy'
  resources :sessions, only: [:create]
  resources :users, except: [:new, :edit]
  resources :projects, only: [:create, :update, :destroy]
  resources :section_titles, only: [:create, :update, :destroy]
  resources :section_title_children, only: [:create, :update, :destroy]
  #call to text_razor text analysis api
  #returns data
  #no need to save
  get '/text_razors', to: 'apis#text_razors'
end
