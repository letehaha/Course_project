var SERVICES, // have services checkbox value for accommodation
    ACCOMMODATIONSUCCESS = 'Заселение прошло успешно!',
    UPDATECLIENTSUCCESS = 'Обновление информации о клиенте прошло успешно!',
    SHOW_BOOKING = 'Отобразить только бронь',
    HIDE_BOOKING = 'Отобразить полный список',
    BOOKING_UPDATE = 'Бронь успешно выполнена',
    BOOKING_RESET = 'Заселения успешно обновлены',
    CHANGE_PASS = 'Пароль изменен успешно';

$(document).ready(function() {

  if(localStorage.getItem('password_status') !== 'true')
    window.location.replace('/course_project/course_app/login.html');


  setAccommodationInfo();
  getEmployeesList();
  getClientsList();
  getRoomsList();
  getAccommodationList();
  normilizeEmployeesTable();
  normilizeRoomsTable();
  normilizeAccommodationTable();

  setTimeout(function(){
    changeBookingStatus();
  },200);

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

    console.log(data);

  	// if(!$(data.client_id).is(':disabled')){
  	// 	if(data.client_id == ''){
  	// 		$(this).find('#accommodation-select-client-field').addClass('validate');
  	// 		return false;
  	// 	}
  	// }



  	

  	if(data.check_new_client == true){
  		addAccommodation(data, clientData);
  	} else{
  		addAccommodation(data);
  	}
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

  $(document).on('click', '.js-payment__item', function(e) {
    var id = $(this).attr('data-payment-id');
    if(!$(this).parent().hasClass('data-booking-true'))
      $('.info-popup-container').removeClass('change-booking')
      
    getInfoAboutPayments(id);
  });

  $(document).on('click', '.js-rooms__item', function(e) {
    var id = $(this).attr('data-room-id');
    getInfoAboutRoom(id);
  });

  $(document).on('click', '.data-booking-true .js-payment__item', function(e) {
    var $id = $(this).text();
    console.log($id);
    $.ajax({
      url: './php_functions/payments/calc_booking.php',
      type: 'POST',
      data: {id: $id},
    })
    .done(function(data) {
      var $data = data;

      console.log(typeof $data);
      setTimeout(function(){
        $('#amount_to_pay_booking').val($data);
        $('#amount_to_pay_booking').attr('data-booking', $id);
      });

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
    
  });

  $(document).on('click', '.data-booking-true .js-payment__item', function(e) {
    $('.info-popup-booking').addClass('change-booking');
  });

  



// $(document) нужен потому, что кнопка генерируется
  $(document).on('click', '.change-employee' ,function(e) {
    $('#employee-list-position').toggleClass('is-hide');
    $('#js-employee-info-form #js-save-change-employee').toggleClass('is-hide');
    $('#employee-position').toggleClass('is-hide');
    $('#js-employee-info-form .js-changeValue').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
  });
  $(document).on('click', '.change-client' ,function(e) {
    // спрятать кнопку "Сохранить изменения" если кнопка "Изменить" неактивна
    $('#js-client-info-form #js-save-change-client').toggleClass('is-hide');
    // toggle disabled атрибут по клику на "Изменить"
    $('#js-client-info-form .js-changeValue').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
  });

  $(document).on('click', '.change-room' ,function(e) {
    // спрятать кнопку "Сохранить изменения" если кнопка "Изменить" неактивна
    $('.js-rooms-content .new-form #js-save-change-room').toggleClass('is-hide');
    // toggle disabled атрибут по клику на "Изменить"
    $('.info-popup .new-form .js-changeValue').prop('disabled', function(i, currentValue) {
      return !currentValue;
    });
  });

  $(document).on('click', '.js-info-popup', function(e){

    $('.info-popup-container').toggleClass('info-popup-container--is-show');
  });

  $(document).on('change', '#accommodation-select-room', function(e) {
    var option 		= $(this).find('option:selected'),
    attrPrice 	= option.attr('data-price'),
    attrSize	= option.attr('data-room-size');

    $(this).attr('data-price', attrPrice);
    $(this).attr('data-room-size', attrSize);

    getAccommodationPrice();
  });

  $(document).on('keyup', '#old-pasword', function(e) {
    var $this = $(this),
        oldpas = localStorage.getItem('password');

    if($this.val() == oldpas){
      $this.removeClass('validate');
      $this.addClass('success');
      $('#new-password').prop('disabled', false);
      $('#change-pass-submit').prop('disabled', false);
    }else{
      $this.addClass('validate');
      $this.removeClass('success');
      $('#new-password').prop('disabled', true);
      $('#change-pass-submit').prop('disabled', true);
    }

  });

  $(document).on('keyup', '#new-password', function(e) {

  });

  $(document).on('submit', '#change-pass-form', function(e) {
    e.preventDefault();

    var newpass = $('#new-password').val();

    $.ajax({
      url: './php_functions/settings/change_pass.php',
      type: 'POST',
      data: {password: newpass},
    })
    .done(function() {
      showNotificationPopup(CHANGE_PASS);
      localStorage.setItem('password', newpass);
      localStorage.setItem('password_status', 'false');
      setTimeout(function(){
        location.reload();
      },1000);
    })

  });

  $(document).on('keyup', '#booking-payed', function(e) {
    e.preventDefault();

    var $this = $(this),
        cost  = $('#amount_to_pay_booking');
    if($this.val() == cost.val()){
      $this.removeClass('validate');
      $('#change-booking-submit').prop('disabled', false);
    }else{
      $this.addClass('validate');
      $('#change-booking-submit').prop('disabled', true);
    }
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
    else if(clientField.attr('data-selected-id-client') == '')
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
    var 	constDay 	= 86400000,
    dateIn 		= $('#accommodation-date-in'),
    dateOut		= $('#accommodation-date-out'),
    dateInVal 	= dateIn.val(),
    dateOutVal	= dateOut.val(),
    newDateIn 	= new Date(dateInVal),
    newDateOut	= new Date(dateOutVal);

    if($(this).val() == '')
      $(this).addClass('validate');
    else
      $(this).removeClass('validate');

    if(newDateOut > newDateIn){
      var dayCount = (newDateOut - newDateIn) / constDay;
      dateOut.siblings('#data-accommodation-days').attr('data-accommodation-days', dayCount);
      dateOut.removeClass('validate');
      dateOut.parent().removeClass('date-out-error')
      getAccommodationPrice();
    } else if (newDateOut.getTime() === newDateIn.getTime() || newDateOut < newDateIn){
      dateOut.addClass('validate');
      dateOut.parent().addClass('date-out-error')
      dateOut.siblings('#data-accommodation-days').attr('data-accommodation-days', '');
    }
  });

  $(document).on('change', '#accommodation-date-in', function(e){
    var today = new Date(),
        dd    = today.getDate(),
        mm    = today.getMonth()+1, //January is 0!
        yyyy  = today.getFullYear(),
        $date = $(this).val();

    if(dd<10)
      dd = '0' + dd

    if(mm<10)
      mm = '0' + mm

    today = '' + yyyy + '-' + mm + '-' + dd + '';

    if(today > $date){
      $(this).addClass('validate')
      $(this).parent().addClass('date-in-error')
    }else{
      $(this).removeClass('validate')
      $(this).parent().removeClass('date-in-error')
    }

  });

  $(document).on('change', '#accommodation-date-in, .accommodation-service-item', function (ev) {
    SERVICES = $('.accommodation-service-item:checked').map(function() {
      return $(this).val();
    }).get();
    getAccommodationPrice();
  });

  $(document).mouseup(function (e){
    var div = $('#info-popup');
    if(div.parent().hasClass('info-popup-container--is-show'))
      if (!div.is(e.target) && div.has(e.target).length === 0)
        div.parent().removeClass('info-popup-container--is-show');
        // div.parent().removeClass('change-booking');
    });

  $(document).on('submit', '#js-payment-info-form', function(e) {
    e.preventDefault();

    var value = $('#booking-payed').val(),
        id    = $('#amount_to_pay_booking').attr('data-booking');
    console.log(id);

    $.ajax({
      url: './php_functions/payments/booking_to_accom.php',
      type: 'POST',
      data: {
        val: value,
        id: id
      },
    })
    .done(function() {
      showNotificationPopup(BOOKING_UPDATE);
      getAccommodationList();
      normilizeAccommodationTable();
      $('.info-popup-container').removeClass('info-popup-container--is-show');
    })
    
  });





  $(document).on('click', '#reset-accommodations', function(e) {
    e.preventDefault();
    
    var date  = new Date(),
        year  = date.getFullYear(),
        month = (function(){
          return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        })(),
        day   = date.getDate(),
        currentDate = year + '-' + month + '-' + day;

    console.log(currentDate);

    $.ajax({
      url: './php_functions/accommodations/update_accommodations.php',
      type: 'POST',
      data: {date: currentDate},
    })
    .done(function(data) {
      console.log(data);
      $('.booking__list').html(data);
      normilizeAccommodationTable();
      setTimeout(function(){
        changeBookingStatus();
      },200);
      showNotificationPopup(BOOKING_RESET);
    })
    
  });

});


$(document).on('click', '#show-booking', function(){

  $('.booking__list').toggleClass('only-booking-true');
  $(this).toggleClass('is-active');

  if($(this).hasClass('is-active'))
    $(this).text(HIDE_BOOKING)
  else
    $(this).text(SHOW_BOOKING)
  
});


function changeBookingStatus(){
  var $el = $('.js-change-booking-value');
  $.each($el, function(index, val) {
    if($(val).text() == '0')
      $(val).text('–');
    else if($(val).text() == '1')
      $(val).text('+')
  });
}

function showNotificationPopup(message){
  var popup 				= $('#notification'),
  msgContainer 	= $('#notification-message');
  popup.addClass('notification--is-show');
  msgContainer.text(message);
  setTimeout(function(){
    popup.removeClass('notification--is-show');
  }, 2000);
}

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
  var	amountToPay,
  sum = 0,
  $days 					= $('#data-accommodation-days').attr('data-accommodation-days'),
  $price 					= $('#accommodation-select-room').attr('data-price'),
  $size 					=	$('#accommodation-select-room').attr('data-room-size'),
  $bookingStatus	= $('#accommodation-booking-checkbox').is(':checked'),
  $services 			= $('.accommodation-service-item:checked'),
  servicesPrice 	= $services.map(function() {
    return $(this).attr('data-price');
  }).get();

  for(var i = 0; i < servicesPrice.length; i++){
    sum += parseInt(servicesPrice[i]);
  }

  if($bookingStatus)
    amountToPay = (parseInt($price) * parseInt($size)) * 1 + sum;
  else
    amountToPay = (parseInt($price) * parseInt($size)) * parseInt($days) + sum;

  $('#accommodation-amount-to-pay').attr('data-amount-to-pay', (parseInt($price) * parseInt($size)) * parseInt($days) + sum);
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

function normilizeAccommodationTable(){
  setTimeout(function(){
    $('.js-ac_date-in').maxWidth();
    $('.js-ac_date-out').maxWidth();
    $('.js-ac_booking').maxWidth();
    $('.js-ac_payment').maxWidth();
    $('.js-ac_client').maxWidth();
    $('.js-ac_room').maxWidth();
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

function getServicesList(){
  $.ajax({
    url: './php_functions/service/get_services.php',
    type: 'POST',
  })
  .done(function(data) {

  })
  .fail(function() {
    alert('error');
  })

}

function getInfoAboutPayments(id){
  $.ajax({
   url: './php_functions/payments/get_payments_list.php',
   type: 'POST',
   data: {id: id},
 })
  .done(function(data) {
   $('#info-popup').html(data);
 })
  .fail(function() {
   alert('error');
 })

}

function getAccommodationList(){
  $.ajax({
   url: './php_functions/accommodations/get_booking_list.php',
   type: 'POST',
 })
  .done(function(data) {
   $('.booking__list').html(data);

 })
  .fail(function() {
   alert('error');
 })

}

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
    $('#add-client')[0].reset();
  })
  .fail(function(){
    alert("error");
  });
};


function addAccommodation(data, clientData){
  var args;
  if(arguments.length == 1){
    args = 1;
    $.ajax({
      url: './php_functions/accommodations/add_accommodation.php',
      type: 'POST',
      data: {
        args 							: args,
        services 					: SERVICES,
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
      showNotificationPopup(ACCOMMODATIONSUCCESS);
      setTimeout(function(){
        location.reload();
      },2000);
    });
  } else if (arguments.length == 2){
    args = 2;
    $.ajax({
      url: './php_functions/accommodations/add_accommodation.php',
      type: 'POST',
      data: {
        args 							: args,
        services 					: SERVICES,
        date_in						: data.date_in,
        date_out					: data.date_out,
        booking_checkbox	: data.booking_checkbox,
        room_number				: data.room_number,
        payment_method		: data.payment_method,
        client_id					: data.client_id,
        check_new_client	: data.check_new_client,
        amount_to_pay			: data.amount_to_pay,
        amount_pay				: data.amount_pay,
        amount_to_booking : data.amount_to_booking,
        fname 	: clientData.fname,
        sname 	: clientData.sname,
        mname 	: clientData.mname,
        passport: clientData.passport,
        tel 		: clientData.tel,
        email 	: clientData.email,
        country : clientData.country,
        comment : clientData.comment
      },
    })
    .done(function(data) {
      $('.js-accom-content').html(data);
      showNotificationPopup(ACCOMMODATIONSUCCESS);
      setTimeout(function(){
        location.reload();
      },2000);
    });
  }

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
};


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
};


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


function submitToUpdateRoom(form){
  var room_number = form.find('input[name="room_number"]').val(),
  room_status = form.find('input[name="room_status"]').val()
  room_size 	= form.find('input[name="room_size"]').val(),
  room_type 	= form.find('input[name="room_type"]').val(),
  price 			= form.find('input[name="price"]').val(),
  email 			= form.find('input[name="email"]').val(),
  country 		= form.find('input[name="country"]').val(),
  comment 		= form.find('textarea[name="comment"]').val(),
  id_client 	= form.attr('data-client-id');

  updateRoomInfo(id_client, first_name, second_name, middle_name, passport, phone, email, country, comment);
};


function submitToUpdateBooking(e){
  e.preventDefault();
  var form = $('#js-payment-info-form');
  console.log(form);
}


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
    $('#info-popup').html(data);

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
    // $('.js-client-content').html(data);
    $('#info-popup').html(data);
    var form = $('#js-client-info-form');
    form.bind('submit', function(e){
      e.preventDefault();
      submitToUpdateClient(form);
      showNotificationPopup(UPDATECLIENTSUCCESS);
      $('.js-changeValue').prop('disabled', function(i, currentValue) {
        return !currentValue;
      });
      $('#js-save-change-client').addClass('is-hide');
      $('.info-popup-container').removeClass('info-popup-container--is-show');
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
    // $('.js-rooms-content').html(data);
    $('#info-popup').html(data);
    var form = $('#js-room-info-form');
    form.bind('submit', function(e){
      e.preventDefault();
      submitToUpdateRoom(form);
    });
    $("#js-room-info-form").on('keyup', '.js-changeValue', function(){
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
};

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
    alert('Был удален сотрудник');
    $('.info-popup-container').removeClass('info-popup-container--is-show');
  })
  .fail(function() {
    alert("error");
  })
}

// function deleteClient(client_id){
//   $.ajax({
//     url: './php_functions/clients/delete_client.php',
//     type: 'POST',
//     data: {
//       client_id:client_id
//     },
//   })
//   .done(function(data) {
//     getClientsList();
//     if(data == 0000)
//       alert('Пользователь не может быть удален! Возможно он заселен в какую-то комнату.');
//   })
//   .fail(function() {
//     alert("error");
//   })
// }

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
