	
	jQuery(document).ready(function($){
		$('.preset-list li a').on('click',function(event){
			event.preventDefault();
			var color = $(this).data('color'),
				url = 'css/presets/'+color+'.css';
				logoSrc = 'images/presets/'+color+'/logo.png';				
				logoSrc1 = 'images/presets/'+color+'/footer-logo.png';				
				logoSrc2 = 'images/presets/'+color+'/logo.png';				
				
			$('.navbar-brand img').attr('src', logoSrc);
			$('.footer-logo img').attr('src', logoSrc1);
			$('.logo img').attr('src', logoSrc2);
			$('#preset').attr('href', url);			
		});

		$('.style-chooser .toggler').on('click', function(event){
			event.preventDefault();
			$(this).closest('.style-chooser').toggleClass('opened');
		});
	});