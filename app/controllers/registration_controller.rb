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
      # registration info
      accessKey = Base64.encode64(cookies["access_key"])
      userId = Base64.encode64(cookies["user_id"])
      refUsername = Base64.encode64(cookies["ref_username"])
      # query linkfbid service
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/linkfacebookid/", { user_id: userId, access_key: accessKey, facebookId: facebookId, ref_username: "ZGF2aWRkYW5n"}
      json = JSON.parse(response)
      render json: json
    else
    end
  end

end
