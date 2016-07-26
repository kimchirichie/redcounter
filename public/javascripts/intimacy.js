$(document).ready(function(){
	
	$.get('/stats',function(data){
		var kissprog = parseFloat(data.kiss)*(100/15)
		var lickprog = parseFloat(data.lick)*(100/5)
		var sexprog = parseFloat(data.sex)*(100/5);
		var totalprog = (kissprog+lickprog+sexprog)/3;
		if (kissprog < 5) kissprog = 5;
		if (lickprog < 5) lickprog = 5;
		if (sexprog < 5) sexprog = 5;
		if (totalprog < 5) totalprog = 5;

		$('#kisscount').html(data.kiss);
		$('#lickcount').html(data.lick);
		$('#sexcount').html(data.sex);

		$('#kissbar').width(kissprog+"%");
		$('#lickbar').width(lickprog+"%");
		$('#sexbar').width(sexprog+"%");
		$('#totalbar').width(totalprog+"%");

		if(kissprog >=60){
			$('#kissbar').parent().addClass('orange');
		}

		if(lickprog >= 60){
			$('#lickbar').parent().addClass('orange');
		}

		if(sexprog >= 80){
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