import './main.scss';
import './fonts/fonts.scss';

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let i = 0; i < popupCloseIcon.length; i++) {
		const el = popupCloseIcon[i];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen (currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function(e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock () {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
	  for (let i = 0; i < lockPadding.length; i++) {
		const el = lockPadding[i];
		el.style.paddingRight = lockPaddingValue;
	  }
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');
  
	unlock = false;
	setTimeout(function() {
	  unlock = true;
	}, timeout)
  }
  
  function bodyUnlock () {
	setTimeout(function () {
	  for(let i = 0; i < lockPadding.length; i++){
		const el = lockPadding[i];
		el.style.paddingRight = '0px';
	  }
	  body.style.paddingRight = '0px';
	  body.classList.remove('lock');
	}, timeout)
	unlock = false;
	setTimeout(function() {
	  unlock = true;
	}, timeout)
  }
  
  document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
	  const popupActive = document.querySelector('.popup.open');
	  popupClose(popupActive);
	}
  })

  

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend (e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			let response = await fetch('https://httpbin.org/get', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset(); 
			} else {
				alert('Error')
			}
		} else {
			alert('Заполните обязательные поля')
		}
	} 

	function formValidate(form) {
			let error = 0;
			let formReq = document.querySelectorAll('._req');
			for (let i = 0; i < formReq.length; i++) {
				let input = formReq[i];
				formRemoveError(input);

				if (input.classList.contains('_email')) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else {
					if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError (input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error')
	  }

	function formRemoveError (input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error')
	  }
	
	function emailTest (input) {
		return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(input.value);
	  }
	
  })
