var showPassBtn = document.getElementById('js-show-pass'),
		loginField	= document.getElementById('js-login-field'),
		loginSubmit	= document.getElementById('js-login-submit'),
		loginForm		= document.getElementById('js-login-form'),
		inputField	= document.getElementById('js-input-field'),
		password		= 'root';

function checkValue(){
	console.log(this.value);
	if(loginField.value !== ''){
		showPassBtn.style.display = 'block';
		showPassBtn.classList.add('fa-eye');
		loginField.classList.add('error');
		loginField.classList.remove('success');
	} else{
		showPassBtn.style.display = 'none';
		showPassBtn.classList.remove('fa-eye');
		showPassBtn.classList.remove('fa-eye-slash');
		loginField.type = 'password';
	}
}

showPassBtn.onmousedown  = function(){
	this.classList.remove('fa-eye');
	this.classList.add('fa-eye-slash');
	loginField.type = 'text';
}
showPassBtn.onmouseup = function(){
	this.classList.remove('fa-eye-slash');
	this.classList.add('fa-eye');
	loginField.type = 'password';
}
showPassBtn.onmousemove = function(){
	this.classList.remove('fa-eye-slash');
	this.classList.add('fa-eye');
	loginField.type = 'password';
}

loginField.onblur = function(){
	if(this.value == ''){
		loginField.classList.remove('error');
		loginField.classList.remove('success');
	}	
}

loginForm.onsubmit = function(e){
	if(loginField.value == password){
		loginField.classList.remove('error');
		loginField.classList.add('success');
		return false;
	} else{
		inputField.classList.add('bounce');
		loginField.classList.add('error');
		setTimeout(function(){
			inputField.classList.remove('bounce');	
		}, 600);
		return false;
	}
}