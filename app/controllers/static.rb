require 'byebug'

get '/' do
	@url = Url.all
  @msg = ""
  erb :"static/index"
end

post '/urls' do
  @url = Url.find_by(long_url: params[:long_url])
  @msg  = ""
	unless Url.exists?(long_url: params[:long_url]) 
    @url = Url.create(:long_url => params[:long_url])
    @url.created_at ? (@msg = "successfully saved") : (@msg = "URL invalid")
  end
  # @url = Url.all
  # result = {:long_url => @url.long_url, :short_url => @url.short_url}
  # result.to_jason
  return @url.to_json 
end

get '/:short_url' do
	@url = Url.find_by(short_url: params[:short_url])
	@url.increment(:click_count)
  @url.save
	redirect @url.long_url
end




# @url = url.find_by(:long_url: params[:long_url])
# if @urlredierect '/'
# else
#   @url = Url.new(:long_url => params[:long_url])
#   if @url.save <----check
#       @msg = "successfully saved"
#       redirect "/"
#       else
#         @msg = "failed"
#         redirect "/"

# @msg = "#{@url.errors.full_messages.join(" ")}"
