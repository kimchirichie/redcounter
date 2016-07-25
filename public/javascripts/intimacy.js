$(document).ready(function(){
	
	$.get('/stats',function(data){
		var kissprog = parseFloat(data.kiss)*(100/30)
		var lickprog = parseFloat(data.lick)*(100/10)
		var sexprog = parseFloat(data.sex)*(100/10);
		var totalprog = (kissprog+lickprog+sexprog)/3;

		$('#kisscount').html(data.kiss);
		$('#lickcount').html(data.lick);
		$('#sexcount').html(data.sex);

		$('#kissbar').width(kissprog+"%");
		$('#lickbar').width(lickprog+"%");
		$('#sexbar').width(sexprog+"%");
		$('#totalbar').width(totalprog+"%");

		if(sexprog >= 80){
			$('#sexbar').parent().removeClass('orange');
			$('#totalbar').parent().removeClass('orange');
			$('#sexbar').parent().addClass('red');
			$('#totalbar').parent().addClass('red');
			fadeout();
		} else if (sexprog >= 40){
			$('#sexbar').parent().addClass('orange');
			$('#totalbar').parent().addClass('orange');
		}

		if(totalprog >= 60){
			$('#fire').show();
		}
	});

	fadeout = function(){
		$('#warning').fadeOut('slow', fadein);
	};

	fadein = function(){
		$('#warning').fadeIn('slow', fadeout);
	}
})