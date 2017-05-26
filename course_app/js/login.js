$(document).ready(function() {
	var $showPassBtn = $('#js-show-pass'),
  $loginField	 = $('#js-login-field'),
  $loginSubmit = $('#js-login-submit'),
  $loginForm	 = $('#js-login-form'),
  $inputField	 = $('#js-input-field');

  $showPassBtn.on('mousedown', function(){
    $(this).removeClass('fa-eye');
    $(this).addClass('fa-eye-slash');
    $loginField.attr('type', 'text');
  });
  $showPassBtn.on('mouseup', function(){
    $(this).removeClass('fa-eye-slash');
    $(this).addClass('fa-eye');
    $loginField.attr('type', 'password');
  });
  $showPassBtn.on('mousemove', function(){
    $(this).removeClass('fa-eye-slash');
    $(this).addClass('fa-eye');
    $loginField.attr('type', 'password');
  });

  $loginField.on('blur', function(){
    if($(this).val() == ''){
     $loginField.removeClass('error');
     $loginField.removeClass('success');
   }	
 });

  $loginField.on('input', function(){
    checkValue();
  });

  $(document).on('submit', $loginForm ,function(e) {
    e.preventDefault();

    var password = $loginField.val();

    $.ajax({
     url: './php_functions/login.php',
     type: 'POST',
     data: {password: password},
   })
    .done(function(data) {

     if($loginField.val() == data){
      $loginField.removeClass('error');
      $loginField.addClass('success');
      localStorage.setItem('password_status', 'true');
      localStorage.setItem('password', data);
      setTimeout(function(){
       window.location.replace('/course_project/course_app/');	
     }, 600);

      return false;

    } else{
      $inputField.addClass('bounce');
      $loginField.addClass('error');

      setTimeout(function(){
       $inputField.removeClass('bounce');	
     }, 600);

      return false;
    }
  })
  });

  function checkValue(){
    console.log($loginField.val());
    if($loginField.val() !== ''){
     $showPassBtn.show();
     $showPassBtn.addClass('fa-eye');
     $loginField.addClass('error');
     $loginField.removeClass('success');
   } else{
     $showPassBtn.hide();
     $showPassBtn.removeClass('fa-eye');
     $showPassBtn.removeClass('fa-eye-slash');
     $loginField.attr('type', 'password');
   }
 };
});
