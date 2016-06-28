require 'byebug'
require 'byebug'
get '/' do
	@url = nil
  erb :"static/index"
end

post '/urls' do
	unless Url.exists?(long_url: params[:long_url])
  		@url = Url.create(:long_url => params[:long_url], :short_url => Url.shorten)
  		
  	else 
  		Url.all.each do |u| 
  			if u.long_url == params[:long_url] 
  				@url = u
  				break
  			end
  		end
  	end
  	 erb :"static/index"
end

get '/:short_url' do
	@url = Url.find_by(short_url: params[:short_url])
	redirect 'http://' + @url.long_url
end

# post '/urls' do
# 	Url.create(long_url: params[:long_url], short_url: Url.shorten)
#   erb :"static/index"
#   redirect '/'
# end