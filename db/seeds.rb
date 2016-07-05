inserts = []
File.open(filename=File.dirname(__FILE__) + "/../db/test").each do |r|

	row = r.chomp.chomp(",")[1..-2]
	short_url = (0..7).map {[(65 + rand(26)).chr, (97 + rand(26)).chr, rand(10)].sample(1) }.join
	urls = "('#{row}','#{short_url}')"

	inserts << urls
	
end

sql = "INSERT INTO urls (long_url, short_url) VALUES " + inserts.join(", ")

Url.connection.execute sql
