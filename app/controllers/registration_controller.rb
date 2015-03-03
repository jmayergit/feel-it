class RegistrationController < ApplicationController
  require 'rest-client'
  require 'json'

  def index
    @response = RestClient.post "http://gfeelitdev.elasticbeanstalk.com/checkemail/", {:email => 'aGdmaGdnaG1j'}
    @status = JSON.parse(@response.body)

  end


end
