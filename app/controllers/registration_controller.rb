class RegistrationController < ApplicationController
  require 'rest-client'
  require 'json'
  require 'base64'
  require 'pry'

  def index
    if params[:r]
      cookies[:ref_username] = params[:r]
    end
  end

  def facebook
    if cookies["access_key"] === nil
      redirect_to root_path
    end
    if cookies["user_id"] === nil
      redirect_to root_path
    end
    if request.post?
      # facebook info
      authData = params["authData"]
      facebookId = Base64.encode64(authData["userID"])
      puts "FACEBOOKID"
      puts facebookId
      # registration info
      accessKey = Base64.encode64(cookies["access_key"])
      puts "ACCESSKEY"
      puts accessKey
      userId = Base64.encode64(cookies["user_id"])
      puts "USERID"
      puts userId
      if cookies[:ref_username]
        refUsername = Base64.encode64(cookies["ref_username"])
      else
        refUsername = "ZGVidWdfc2hydWc="
      end
      puts "REFUSERNAME"
      puts refUsername
      # query linkfbid service
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/linkfacebookid/", { user_id: userId, access_key: accessKey, facebookId: facebookId, ref_username: refUsername}
      json = JSON.parse(response)
      render json: json
    else
    end
  end

end
