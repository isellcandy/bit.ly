require 'uri'

class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
	validates_presence_of :long_url
	validates :long_url, format:{ with: (URI::regexp(['http', 'https']))}

	before_create :shorten

	def shorten
		self.short_url = (0..7).map {[(65 + rand(26)).chr, (97 + rand(26)).chr, rand(10)].sample(1) }.join
	end
end



# active record call back method
# before_save :shorten_it
# can also do after_save

# def shorten_it
# 	sef.short_irl = SecureRAndom.hex(6)
# end

# validatio: :long_url,  format: {with: URI::regex("http", "https")}