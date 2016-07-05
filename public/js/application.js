$(document).ready(function(){
	$("form").submit(function(event){
		
		event.preventDefault();
		$('form > input[type="submit"]').val('Submitting...');
		$('form > input[type="submit"]').attr('disabled',true);
		$.ajax({
			method: "POST",
			url: '/urls',
			data: $(this).serialize(), 
			dataType: 'json',
			success: function(data){
			  $('form > input[type="submit"]').val('Shorten');
			  $('form > input[type="submit"]').attr('disabled',false);
			  // var t = $.parseJSON(data);
			  var link = "<a href ='/"+ data.short_url + "' target='_blank'>" + data.short_url+ "</a>";
			  $('.output_table').append("<tr><td>" + data.long_url + "</td><td>" + link +
				"</td><td>" + data.click_count + "</td></tr>");
			} 
		});

		// ajax alternative
		// var $form = $(this),
		// term = $form.find("input[name='long_url']").val(),
		// url = $form.attr('action');
		// console.log(term);
		// console.log(url);

		// var posting = $.post(url, {long_url: term});
		// posting.done(function(data){
		// 	console.log(data);
		// 		var t = $.parseJSON(data);
		// 		$('.output_table').append("<tr><td>" + t['long_url'] + "</td>" +
		// 		"<td id='short_link'><a href = '/<%= u.short_url %>'>" + t['short_url'] + "</a></td>" +
		// 		"<td>" + t['click_count'] + "</td></tr>");
		// });

	});

	$(".test").hide();

	$('#pop_out').click(function(){

	var app = {

		cards: [1,1,2,2,3,3,4,4,5,5,6,6],

		init: function(){
			app.shuffle();
		},

		shuffle: function() {
			var random = 0;
			var temp = 0;
			for (var i = 0; i< app.cards.length; i++){
				random = Math.round(Math.random() * 11);
				temp = app.cards[i];
				app.cards[i] = app.cards[random];
				app.cards[random] = temp;
			}
			app.assignCards();
			console.log("shuffled array: " + app.cards);
			console.log(app.cards.length);
		},
		assignCards: function(){
			$('.card').each(function(index){
				$(this).attr('data-card-value', app.cards[index]);
			});
			app.clickHandlers();
		},
		clickHandlers: function(){
			$('.card').on('click', function() {
				$(this).html('<p>'+ $(this).data('cardValue') + '</p>').addClass('selected');
				app.checkMatch();
			});
		
		},
		checkMatch: function() {
			if ($('.selected').length === 2) {
				if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
					$('.selected').each(function(){
						$(this).animate({opacity: 0}).removeClass("unmatch selected");
					});
					app.checkWin()
				} else {
					setTimeout(function() {
						$('.selected').each(function() {
							$(this).html('').removeClass("selected");
						});	
					}, 500);
				}
			}
		},
		checkWin: function() {
			if ($('.unmatch').length === 0) {
				$('.simpleCardGame').html('<h1> You Won!!!! Now go shorten some Url </h1>');
			}
		}
	};

	$('.test').toggle('slow');
	app.init();
	});

});

	// $(this)
	// $("form").attr("action")

// $.ajax({
// 	type: "POST",
// 	url: url,
// 	data: data,
// 	success: success,
// 	dataType: dataType
// });