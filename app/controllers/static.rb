require 'byebug'

get '/' do
	@url = nil
  erb :"static/index"
end

post '/urls' do
  byebug
  if params[:long_url].valid?
  	unless Url.exists?(long_url: params[:long_url])
    		@url = Url.create(:long_url => params[:long_url], :short_url => Url.shorten, :click_count => 0)
    	else 
    		Url.all.each do |u| 
    			if u.long_url == params[:long_url] 
    				@url = u
    				break
    			end
    		end
    	end
    	 erb :"static/index"
  else 
    redirect '/'
  end
end

get '/:short_url' do
	@url = Url.find_by(short_url: params[:short_url])
	@url.add_click_count
	redirect 'http://' + @url.long_url
end