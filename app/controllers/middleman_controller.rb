require 'pry'
class MiddlemanController < ApplicationController

  def load
    if params[:email]
      email = params[:email]
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/checkemail/", {:email => email}
      render json: response
    end

    if params[:username]
      username = params[:username]
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/checkusername/", {:username => username}
      render json: response
    end

    if params[:password]
      password = params[:password]
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/checkpassword/", {:password => password}
      render json: response
    end
  end

  def register
    username = params["username"]
    password = params["password"]
    email = params["email"]
    response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/registeruser/", {:email => email, :password => password, :username => username}
    @result = JSON.parse(response.body)
      cookies[:access_key] = @result["access_key"]
      cookies[:user_id] = @result["user_id"]
    redirect_to facebook_path
  end

end
