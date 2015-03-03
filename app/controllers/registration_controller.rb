class RegistrationController < ApplicationController
  require 'rest-client'
  require 'json'
  require 'base64'

  def index

  end

  def search
    email = params[:e].downcase
    enc_email = Base64.encode64(email)
    @response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/checkemail/", {:email => enc_email}
    @status = JSON.parse(@response.body)
  end

end
