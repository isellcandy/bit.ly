class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
	def self.shorten
		(0..7).map {[(65 + rand(26)).chr, (97 + rand(26)).chr, rand(10)].sample(1) }.join
	end
end
