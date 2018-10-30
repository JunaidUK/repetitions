Rails.application.routes.draw do
  devise_for :athletes
  devise_scope :athlete do
    authenticated :athlete do
      root 'interfaces#index', as: :authenticated_root
    end
    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :interfaces, only: [:index,:edit]
end
