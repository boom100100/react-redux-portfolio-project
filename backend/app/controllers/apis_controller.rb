require "uri"
require "net/http"

class ApisController < ApplicationController
  def text_razors
    url = URI("https://api.textrazor.com/")

    https = Net::HTTP.new(url.host, url.port);
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["x-textrazor-key"] = "e76984a0d8e7daab3f1b21f3aec07a04616ca66991a43af8f7660e51"
    request["Content-Type"] = "application/x-www-form-urlencoded"

    params[:text] = 'When designing shiny new web applications using React, it’s easy to forget about the accessibility of what you are developing, or even failing to consider what native features React provides to help make the web more accessible. I am going to cover some basic features that React enables and/or supports, as well as some basic implementations.' if params[:text].nil?
    request.body = "text=" + params[:text] + '&extractors=topics'

    response = https.request(request)

    render json: JSON.parse(response.read_body)#, only: ['response']#, include: ['label']
  end
end
