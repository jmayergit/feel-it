class RegistrationController < ApplicationController
  require 'rest-client'
  require 'json'
  require 'base64'

  def index

  end

  def facebook
    @access = cookies[:access_key]
    @user_id = cookies[:user_id]
  end

end
