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
      binding.pry
      # facebook info
      authData = params["authData"]
      facebookId = Base64.encode64(authData["userID"])
      # registration info
      accessKey = Base64.encode64(cookies["access_key"])
      userId = Base64.encode64(cookies["user_id"])
      refUsername = Base64.encode64(cookies["ref_username"])
      # query linkfbid service
      binding.pry
      response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/linkfacebookid/", { user_id: userId, access_key: accessKey, facebookId: facebookId, ref_username: "ZGF2aWRkYW5n"}
      # render json response, used in js to know which page to redirect to
      binding.pry
    else
    end
  end

end
