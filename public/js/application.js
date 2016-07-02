$(document).ready(function(){
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

