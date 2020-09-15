class UsersController < ApplicationController
    # before_action :redirect_if_logged_in
  
  
    def create
      @user = User.new(user_params)
      if @user.save
        login!(@user)
        render :show
      else
        @errors = @user.errors
        render :error
      end
    end
  end