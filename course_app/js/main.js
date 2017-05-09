$(document).ready(function() {

	var loadPage = function(href){
		$.ajax({
			url: 'service.php',
			method: 'GET',
			cache: false,
			data: {
				link: href
			},
			success: function(data){
				$('.pjax-content').html(data);
				getEmployeesList();
				getClientsList();
				getRoomsList();
				normilizeEmployeesTable();
				normilizeRoomsTable();
				setAccommodationInfo();
			}
		});
	};

	$(window).on('popstate', function(){
		loadPage(location.pathname.split('/').pop());
	});

	getEmployeesList();
	getClientsList();
	getRoomsList();
	normilizeEmployeesTable();
	normilizeRoomsTable();
	setAccommodationInfo();

	$(document).on('click', '.sidebar-panel__item-link', function(e) {
		var href = $(this).attr('href');
		$('.sidebar-panel__item-link').removeClass('active');
		$(this).addClass('active');
		history.pushState(null, null, href);
		loadPage(href);
		e.preventDefault();
	});

	// по клику на "добавить" сотрудника отправляется запрос на вставку значений
	$(document).on('submit', '#add-employee' ,function(e) {
		e.preventDefault();
		addEmployee($(this));
	});

	$(document).on('submit', '#add-client' ,function(e) {
		e.preventDefault();
		var data = {
			fname		: $(this).find('input[name="fname"]').val(),
			sname		: $(this).find('input[name="sname"]').val(),
			mname		: $(this).find('input[name="mname"]').val(),
			passport: $(this).find('input[name="passport"]').val(),
			tel 		: $(this).find('input[name="tel"]').val(),
			email		: $(this).find('input[name="email"]').val(),
			country	: $(this).find('input[name="country"]').val(),
			comment	: $(this).find('textarea[name="comment"]').val()
		}
		addClient(data);
	});

	$(document).on('submit', '#accommodation-form' ,function(e) {
		e.preventDefault();
		var data = {
			date_in 					: $(this).find('#accommodation-date-in').val(),
			date_out					: $(this).find('#accommodation-date-out').val(),
			booking_checkbox 	: checkCheckboxValue('#accommodation-booking-checkbox'),
			room_number 			: $(this).find('#accommodation-select-room').val(),
			payment_method		: $(this).find('#accommodation-select-payment-method').val(),
			client_id					: $(this).find('#accommodation-select-client-field').attr('data-selected-id-client'),
			check_new_client	: checkCheckboxValue('#accommodation-new-quest-checkbox'),
			amount_to_pay			: $('#accommodation-amount-to-pay').attr('data-amount-to-pay'),
			amount_pay				: $('#accommodation-amount-pay').val(),
			amount_to_booking	: $('#accommodation-amount-to-pay').val()
		};
		var clientData = {
			fname		: $(this).find('input[name="fname"]').val(),
			sname		: $(this).find('input[name="sname"]').val(),
			mname		: $(this).find('input[name="mname"]').val(),
			passport: $(this).find('input[name="passport"]').val(),
			tel 		: $(this).find('input[name="tel"]').val(),
			email		: $(this).find('input[name="email"]').val(),
			country	: $(this).find('input[name="country"]').val(),
			comment	: $(this).find('textarea[name="comment"]').val()
		}

		$.each($(this).find('.required'), function(index, el) {
			$(el).removeClass('validate');

			if(!$(el).is(':disabled'))
				if($(el).val() == '')
					$(el).addClass('validate');
		});
		
		if(!checkAmoutPay())
			return false;

		if(!$(data.client_id).is(':disabled')){
			console.log(true);
			if(data.client_id == ''){
				$(this).find('#accommodation-select-client-field').addClass('validate');
				return false;
			}
		}

		console.log(data);

		if(data.check_new_client == false){
			console.log(false);
		} else{
			console.log(true);
		}
		// addAccommodation(data);
	});

	// по клику на элемент списка посылается AJAX для подгрузки информации о сотруднике в правой таблице
	$(document).on('click', '.js-employees__item', function(e) {
		var id = $(this).attr('data-employee-id');
		getInfoAboutEmployee(id);
	});

	$(document).on('click', '.js-client__item', function(e) {
		var id = $(this).attr('data-client-id');
		getInfoAboutClient(id);
	});

	$(document).on('click', '.js-rooms__item', function(e) {
		var id = $(this).attr('data-room-id');
		getInfoAboutRoom(id);
	});
	


	// $(document) нужен потому, что кнопка генерируется
	$(document).on('click', '.change-employee' ,function(e) {
		$('#employee-list-position').toggleClass('is-hide');
		$('.js-employees-content .new-form #js-save-change-employee').toggleClass('is-hide');
		$('#employee-position').toggleClass('is-hide');
		$('.js-employees-content .new-form .js-changeValue').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
	});
	$(document).on('click', '.change-client' ,function(e) {
		// спрятать кнопку "Сохранить изменения" если кнопка "Изменить" неактивна
		$('.js-client-content .new-form #js-save-change-client').toggleClass('is-hide');
		// toggle disabled атрибут по клику на "Изменить"
		$('.js-client-content .new-form .js-changeValue').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
	});

	$(document).on('click', '.change-room' ,function(e) {
		// спрятать кнопку "Сохранить изменения" если кнопка "Изменить" неактивна
		$('.js-rooms-content .new-form #js-save-change-room').toggleClass('is-hide');
		// toggle disabled атрибут по клику на "Изменить"
		$('.js-rooms-content .new-form .js-changeValue').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
	});

	$(document).on('change', '#accommodation-select-room', function(e) {
		var option 		= $(this).find('option:selected'),
				attrPrice = option.attr('data-price'),
				attrSize	= option.attr('data-room-size');
		$(this).attr('data-price', attrPrice);
		$(this).attr('data-room-size', attrSize);
		getAccommodationPrice();
	});

	$(document).on('keyup', '#accommodation-amount-pay', function(e){
		checkAmoutPay();
	});

	$(document).on('change', '#accommodation-booking-checkbox', function(e){
		getAccommodationPrice();
		checkAmoutPay();
	});

	$(document).on('change', '#accommodation-new-quest-checkbox', function(e){
		$('.js-client-form').toggleClass('is-visible');
		$('#accommodation-select-client-field').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
    var clientField = $('#accommodation-select-client-field');
    if(clientField.is(':disabled'))
			clientField.removeClass('validate');
		else
			if(clientField.attr('data-selected-id-client') == '')
				clientField.addClass('validate');
	});
	
	$(document).on('keyup', '#accommodation-select-client-field', function(e) {
		var $this = $(this);
		$('.accommodation-client-list-item').each(function(index, el) {
			
			if($(el).attr('value') == $this.val()){
				var num = $(this).attr('data-id-client');
				$this.attr('data-selected-id-client', num);
				$this.removeClass('validate');
				return false;
			}
			$this.addClass('validate');
			$this.attr('data-selected-id-client', '');	
		});
	});

	$(document).on('change', '#accommodation-date-in, #accommodation-date-out', function(e){
		var constDay 		= 86400000,
				dateIn 			= $('#accommodation-date-in'),
				dateOut			= $('#accommodation-date-out'),
				dateInVal 	= dateIn.val(),
				dateOutVal	=	dateOut.val(),
				newDateIn 	= new Date(dateInVal),
				newDateOut	= new Date(dateOutVal);

		if($(this).val() == '')
			$(this).addClass('validate');
		else
			$(this).removeClass('validate');

		if(newDateOut > newDateIn){
			var dayCount = (newDateOut - newDateIn) / constDay;
			dateOut.siblings('#data-accommodation-days').attr('data-accommodation-days', dayCount);
			dateIn.removeClass('validate');
			dateOut.removeClass('validate');
			getAccommodationPrice();
		} else if (newDateOut.getTime() === newDateIn.getTime() || newDateOut < newDateIn){
			dateOut.addClass('validate');
			dateOut.siblings('#data-accommodation-days').attr('data-accommodation-days', '');
		}
	});
  

});

function checkAmoutPay(){
	var amountPayField 	= $('#accommodation-amount-pay'),
			amountToPay 		= parseInt($('#accommodation-amount-to-pay').val()),
			amountPay 			= parseInt($('#accommodation-amount-pay').val());

	if(amountPay < amountToPay || isNaN(amountPay)){
		amountPayField.addClass('validate');
	}
	else if (amountPay > amountToPay){
		amountPayField.addClass('validate');
	}
	else{
		amountPayField.removeClass('validate');
		return true;
	}
	return false;
}

function getAccommodationPrice(){
	var days 	= $('#data-accommodation-days').attr('data-accommodation-days'),
			price = $('#accommodation-select-room').attr('data-price'),
			size 	=	$('#accommodation-select-room').attr('data-room-size'),
			bookingStatus	= $('#accommodation-booking-checkbox'),
			amountToPay;
	
	if(bookingStatus.is(':checked'))
		amountToPay = (parseInt(price) * parseInt(size)) * 1;
	else
		amountToPay = (parseInt(price) * parseInt(size)) * parseInt(days);

	$('#accommodation-amount-to-pay').attr('data-amount-to-pay', (parseInt(price) * parseInt(size)) * parseInt(days));
	$('#accommodation-amount-to-pay').val(amountToPay);
}

function setAccommodationInfo(){
	var selectRoom 					= $('#accommodation-select-room'),
			selectRoomOption 		= selectRoom.find('option:selected'),
			selectRoomattrPrice = selectRoomOption.attr('data-price'),
			selectRoomattrSize	= selectRoomOption.attr('data-room-size');

	selectRoom.attr('data-price', selectRoomattrPrice);
	selectRoom.attr('data-room-size', selectRoomattrSize);
}

function normilizeEmployeesTable(){
	setTimeout(function(){
		$('.employees__id').maxWidth();
		$('.employees__first-name').maxWidth();
		$('.employees__second-name').maxWidth();
		$('.employees__middle-name').maxWidth();
		$('.employees__position').maxWidth();
		$('.employees__salary').maxWidth();
	}, 50);
};

function normilizeClientsTable(){
	setTimeout(function(){
		$('.js-cl_fname').maxWidth();
		$('.js-cl_sname').maxWidth();
		$('.js-cl_mname').maxWidth();
		$('.js-cl_pass').maxWidth();
		$('.js-cl_tel').maxWidth();
		$('.js-cl_mail').maxWidth();
		$('.js-cl_country').maxWidth();
		$('.js-cl_comment').maxWidth();
	}, 50);
};
function normilizeRoomsTable(){
	setTimeout(function(){
		$('.js-rooms__name').maxWidth();
		$('.js-rooms__size').maxWidth();
		$('.js-rooms__status').maxWidth();
		$('.js-rooms__type').maxWidth();
		$('.js-rooms__price').maxWidth();
		$('.js-rooms__service').maxWidth();
	}, 50);
};

function getEmployeeId(){
	return $('.employees__item').attr('data-employee-id');
}

// ******** GET LIST ********

function getEmployeesList(id_employee){
	$.ajax({
		url: './php_functions/employee/get_employees_list.php',
		type: 'POST',
	})
	.done(function(data) {
		$('.employees__list').html(data);
		normilizeEmployeesTable();
		$('.employees__item[data-employee-id="'+id_employee+'"]').addClass('changed_field');
	})
	.fail(function() {
		alert("error");
	})
};
function getClientsList(id_employee){
	$.ajax({
		url: './php_functions/clients/get_clients_list.php',
		type: 'POST',
	})
	.done(function(data) {
		$('.clients__list').html(data);
		normilizeClientsTable();
	})
	.fail(function() {
		alert("error");
	})
};
function getRoomsList(id_employee){
	$.ajax({
		url: './php_functions/rooms/get_rooms_list.php',
		type: 'POST',
	})
	.done(function(data) {
		$('.rooms__list').html(data);
		normilizeRoomsTable();
	})
	.fail(function() {
		alert("error");
	})
};

// **************************


// ******** ADD INFO ********

function addEmployee(data){
	$.ajax({
		url: './php_functions/employee/add_employee.php',
		type: 'POST',
		data: decodeURI(data.serialize()),
	})
	.done(function(data) {
		getEmployeesList();
	})
	.fail(function(){
		alert("error");
	});
};

function addClient(data){
	$.ajax({
		url: './php_functions/clients/add_client.php',
		type: 'POST',
		data: {
			fname: 		data.fname,
			sname: 		data.sname,
			mname: 		data.mname,
			passport: data.passport,
			tel: 			data.tel,
			email: 		data.email,
			country: 	data.country,
			comment: 	data.comment
		},
	})
	.done(function(data) {
		getClientsList();
	})
	.fail(function(){
		alert("error");
	});
};


function addAccommodation(data, clientData){
	$.ajax({
		url: './php_functions/accommodations/add_accommodation.php',
		type: 'POST',
		data: {
			date_in						: data.date_in,
			date_out					: data.date_out,
			booking_checkbox	: data.booking_checkbox,
			room_number				: data.room_number,
			payment_method		: data.payment_method,
			client_id					: data.client_id,
			check_new_client	: data.check_new_client,
			amount_to_pay			: data.amount_to_pay,
			amount_pay				: data.amount_pay,
			amount_to_booking : data.amount_to_booking
		},
	})
	.done(function(data) {
		$('.js-accom-content').html(data);
	})
}



// **************************


// ******** UPDATE INFO ********

function submitToUpdateEmployee(form){
	var first_name 	= form.find('input[name="first_name"]').val(),
			second_name = form.find('input[name="second_name"]').val()
			middle_name = form.find('input[name="middle_name"]').val(),
			id_employee = form.attr('data-employee-id'),
			id_position	= resultPosition();

	// если пользователь не менял значение в селекте при изменении данных, то мы берем id должности из атрибута
	function resultPosition(){
		if(form.find('#employee-list-position').val() == null){
			return form.find('input[name="position"]').attr('data-id');
		}
		return form.find('#employee-list-position').val();
	};
	updateEmployeeInfo(id_employee, first_name, second_name, middle_name, id_position);
}
function updateEmployeeInfo(id_employee, first_name, second_name, middle_name, id_position){
	$.ajax({
		url: './php_functions/employee/update_employee_info.php',
		type: 'POST',
		data: {
			id_employee:id_employee,
			first_name: first_name,
			second_name:second_name,
			middle_name:middle_name,
			id_position:id_position
		},
	})
	.done(function(data) {
		getEmployeesList(id_employee);
	})
	.fail(function() {
		alert("error");
	})
};



function submitToUpdateClient(form){
	var first_name 	= form.find('input[name="first_name"]').val(),
			second_name = form.find('input[name="second_name"]').val()
			middle_name = form.find('input[name="middle_name"]').val(),
			passport 		= form.find('input[name="passport"]').val(),
			phone 			= form.find('input[name="phone"]').val(),
			email 			= form.find('input[name="email"]').val(),
			country 		= form.find('input[name="country"]').val(),
			comment 		= form.find('textarea[name="comment"]').val(),
			id_client 	= form.attr('data-client-id');

	updateClientInfo(id_client, first_name, second_name, middle_name, passport, phone, email, country, comment);
}

function updateClientInfo(id_client, first_name, second_name, middle_name, passport, phone, email, country, comment){
	$.ajax({
		url: './php_functions/clients/update_client_info.php',
		type: 'POST',
		data: {
			id_client		:id_client,
			first_name	: first_name,
			second_name	:second_name,
			middle_name	:middle_name,
			passport		:passport,
			phone				:phone,
			email				:email,
			country			:country,
			comment			:comment
		},
	})
	.done(function(data) {
		getClientsList(id_client);
	})
	.fail(function() {
		alert("error");
	})
};

// function submitToUpdateRoom(form){
// 	var room_number = form.find('input[name="room_number"]').val(),
// 			room_status = form.find('input[name="room_status"]').val()
// 			room_size 	= form.find('input[name="room_size"]').val(),
// 			room_type 	= form.find('input[name="room_type"]').val(),
// 			price 			= form.find('input[name="price"]').val(),
// 			email 			= form.find('input[name="email"]').val(),
// 			country 		= form.find('input[name="country"]').val(),
// 			comment 		= form.find('textarea[name="comment"]').val(),
// 			id_client 	= form.attr('data-client-id');

// 	updateRoomInfo(id_client, first_name, second_name, middle_name, passport, phone, email, country, comment);
// }


// *****************************


// ******** GET INFO ABOUT ********

function getInfoAboutEmployee(id){
	$.ajax({
		url: './php_functions/employee/get_info_about_employee.php',
		type: 'POST',
		data: {id: id},
	})
	.done(function(data) {
		console.log(id);
		$('.js-employees-content').html(data);


		var form = $('#js-employee-info-form');
		form.bind('submit', function(e){
			e.preventDefault();
			submitToUpdateEmployee(form);
		});
		$("#js-employee-info-form").on('keyup', '.js-changeValue', function(){
			$(this).attr('value', $(this).val())
		});

		$('.employeer-item-info').on('click', '.delete', function(e) {
			var employee_id = $(this).attr('data-employee-id');
			deleteEployee(employee_id);
		});

	})
	.fail(function(){
		alert("error");
	});
}

function getInfoAboutClient(id){
	$.ajax({
		url: './php_functions/clients/get_info_about_client.php',
		type: 'POST',
		data: {id: id},
	})
	.done(function(data) {
		$('.js-client-content').html(data);

		var form = $('#js-client-info-form');
		form.bind('submit', function(e){
			e.preventDefault();
			submitToUpdateClient(form);
		});
		$("#js-client-info-form").on('keyup', '.js-changeValue', function(){
			$(this).attr('value', $(this).val())
		});

		$('.client-item-info').on('click', '.delete', function(e) {
			var client_id = $(this).attr('data-client-id');
			deleteClient(client_id);
		});

	})
	.fail(function(){
		alert("error");
	});
}

function getInfoAboutRoom(id){
	console.log(id);
	$.ajax({
		url: './php_functions/rooms/get_info_about_room.php',
		type: 'POST',
		data: {id: id},
	})
	.done(function(data) {
		$('.js-rooms-content').html(data);

		var form = $('#js-room-info-form');
		form.bind('submit', function(e){
			e.preventDefault();
			submitToUpdateRoom(form);
		});
		$("#js-room-info-form").on('keyup', '.js-changeValue', function(){
			$(this).attr('value', $(this).val())
		});

		// $('.client-item-info').on('click', '.delete', function(e) {
		// 	var client_id = $(this).attr('data-client-id');
		// 	deleteClient(client_id);
		// });

	})
	.fail(function(){
		alert("error");
	});
}

// ********************************


// ******** DALETE INFO ********

function deleteEployee(employee_id){
	$.ajax({
		url: './php_functions/employee/delete_employee.php',
		type: 'POST',
		data: {
			employee_id:employee_id
		},
	})
	.done(function(data) {
		getEmployeesList();
		alert('Был удален сотрудник:' + data);
	})
	.fail(function() {
		alert("error");
	})
}

function deleteClient(client_id){
	$.ajax({
		url: './php_functions/clients/delete_client.php',
		type: 'POST',
		data: {
			client_id:client_id
		},
	})
	.done(function(data) {
		getClientsList();
		alert('Был удален клиент:' + data);
	})
	.fail(function() {
		alert("error");
	})
}

// *****************************


$.fn.maxWidth = function (){
	var $blocks = $(this),
	maxH = $blocks.eq(0).width(); 
	$blocks.each(function(){
		if ( $(this).width() > maxH ) {
			maxH = $(this).width() + 1;
		}
	});
	$blocks.width(maxH); 
}

$.fn.maxHeight = function (){
	var $blocks = $(this),
	maxH = $blocks.eq(0).height(); 
	$blocks.each(function(){
		if ( $(this).height() > maxH ) {
			maxH = $(this).height() + 1;
		}
	});
	$blocks.height(maxH); 
}

function checkCheckboxValue(elem){
	return $(elem).is(':checked') ? true : false;
}