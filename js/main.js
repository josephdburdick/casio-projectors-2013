
$('document').ready(function(){
	menu();
	if ($('.cycle-slideshow').length > 0){
		cycle();
	}
	
});

$(window).load(function(){
	if ($('#news-block-filter')){
		newsfilter();
	}

	$.getScript('js/vendor/jquery.lazyload.min.js',function(){
		lazyImg();	
		$(window).trigger('scroll')
	});
});


function lazyImg(){
	$("img.lazy").lazyload({ 
		threshold : 200,
		effect : "fadeIn" 
	});
	$(window).trigger('scroll');
}

function menu(){

	$('.dd-menu').on('mouseleave',function(){
		$('.dd-menu, nav a[data-menu].active, .container_12.active').removeClass('active');
	});	

	$('nav ul li > a, nav ul li h1 > a').on('mouseenter',function(){

		if (!$(this).data('menu')){

      $('.dd-menu, nav a[data-menu].active, .container_12.active').removeClass('active');
    } else {
      
      var dd = '#' + $(this).attr('data-menu').replace('menu','dd');
      var tab = $(this).find('.tab');

      if (!$('nav a[data-menu]').hasClass('active')){ //Menu is not already open
        $(this).addClass('active').siblings().removeClass('active');
        $('.dd-menu').addClass('active').find('.container_12'+dd).addClass('active');
        $('html').on('click',function(){
          $('.dd-menu').trigger('mouseleave');
        });
      } else { //Menu is open

        var dd = '#' + $(this).attr('data-menu').replace('menu','dd');

        $('nav a[data-menu].active,.container_12.active').removeClass('active');
        $(this).addClass('active');  
        $(dd).addClass('active').siblings().removeClass('active');
      } 
    }
	});

	

	if ($('[data-tooltip]').length > 0) {
		var tooltipText;
		$('[data-tooltip]').each(function(){
			tooltipText = $(this).data('tooltip');
			if ($(this).hasClass('last'))
				$(this).append('<div class="tooltip last">'+ tooltipText +'</div>');
			else
				$(this).append('<div class="tooltip">'+ tooltipText +'</div>');
		})

	}
}
function news(){
	var options = ({
		items_per_page : 8,
		abort_on_small_lists: true
	});

	$('#page_container').pajinate(options, indentItems);
	indentItems();
}
function newsfilter(){
	$('#news-block-filter .ul-blocked li a').on('click',function(event){
		var thisFilter = $(this).data('filter');
		if (thisFilter == "all"){
			$('#news-container').load('news-blocks.html .block-item',function(){
					news();
					indentItems();
					lazyImg();
					$(window).trigger('scroll');
			});
		}
		else {
			$('#news-container').load('news-blocks.html .'+thisFilter,function(){
					news();
					indentItems();
					lazyImg();
					$(window).trigger('scroll');
			});
		}			
		event.preventDefault();

	});
}
function indentItems(){
	var $allItems = $('#news-container .block-item').filter(':visible');
	var $firstItem = $('#news-container .block-item').filter(':visible').first();
	$allItems.removeClass('first-child');
	$firstItem.addClass('first-child');
	
}
function cycle(){
	$.getScript('js/vendor/jquery.cycle.js',function(){
		$('.cycle-slideshow').each(function(i){
			$(this).attr('id', 'cycle-'+i)
			var thisCycle = '#' + $(this).attr('id');
			var thisPager = '#' + $(this).next('.cycle-pager').attr('id');
			
			$(thisCycle).after('<ul class="cycle-pager text-left" id="cycle-pager-'+ i +'"></ul>').cycle({
        slides: "li",
        speed:2000,
        timeout:4000,
        fx:'fade',
        swipe:true,
        activePagerClass: 'active',
        pager: ('#cycle-pager-'+ i),
        after: onAfter,
        pagerAnchorBuilder: function(idx, slide) {
        	var imgSrc = $(slide).find('img').attr('src');
            return '<li><a href="javascript:void(0);"><img src="' + imgSrc + '" height="50" /></a></li>'; 
        }
	    });
	    i++
		});

		function onAfter(curr,next,opts) {
	    //var caption = 'Image ' + (opts.currSlide + 1) + ' of ' + opts.slideCount;
	    $('.cycle-pager').css({height:'auto'});
	  }
	});
}

function toggles(showToggle, hideToggle){
	$(showToggle).animate({height:"toggle", opacity:'1'},600);
	$(hideToggle).animate({height:"toggle", opacity:'0'},600);
}