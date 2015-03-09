class RegistrationController < ApplicationController
  require 'rest-client'
  require 'json'
  require 'base64'

  def index
    if params[:r]
      cookies[:ref_username] = params[:r]
    end
  end

  def facebook
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
      refUsername = Base64.encode64(cookies["ref_username"])
      puts "REFUSERNAME"
      puts refUsername
      # query linkfbid service
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/linkfacebookid/", { user_id: userId, access_key: accessKey, facebookId: facebookId, ref_username: "ZGF2aWRkYW5n"}
      json = JSON.parse(response)
      render json: json
    else
    end
  end

end
