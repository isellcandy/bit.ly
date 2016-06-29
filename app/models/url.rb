require 'uri'

class Url < ActiveRecord::Base
	# This is Sinatra! Remember to create a migration!
	valid_url_input = /http?:\/\/[\S]+/
	validates_of_presence :long_url
	validates_format_of :long_url, :with => valid_url_input 


	def self.shorten
		(0..7).map {[(65 + rand(26)).chr, (97 + rand(26)).chr, rand(10)].sample(1) }.join
	end

	def add_click_count
		self.click_count += 1
		self.save!
	end
end
