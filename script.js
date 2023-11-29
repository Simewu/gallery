// Fade-in any elements that have the class 'fade' when the page loads 
window.addEventListener('DOMContentLoaded', (event) => {
	init();
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'G-LGHB6S47PK');
	let containerElement = document.querySelector('.fade');
	if (containerElement) {
		containerElement.classList.add('show');
	}
});

// Toggle between light and dark mode, affecting the background, text colors, and various other elements
function toggleNightMode(isNight = true, useAnimations = true, saveToLocalStorage = true) {
	let transitionClass = 'night-mode-animation';

	let elements = document.querySelectorAll('.bg-color, .bg-color-dim, .text-color, .text-color-dim, .text-color-bold, p a');
	elements.forEach(el => {
		if (useAnimations) {
			el.classList.add(transitionClass);
		} else {
			el.classList.remove(transitionClass);
		}
	});

	let iconElement = document.getElementById('dayNightIcon');

	let bgColor = '#f8f9fa';
	let bgColorInv = '#4a7768';
	let bgColorDim = '#ecf2f5';
	let bgColorDimmer = '#c7dbea';
	let textColor = '#202828';
	let textColorInv = '#f7f9f9';
	let textColorDim = '#055aa1';
	let textColorDimmer = '#c7dbea';
	let textColorBold = '#000000';
	let linkText = '#3a633a';
	let borderColor = '#b2cee5';
	if (isNight) {
		bgColor = '#212529';
		bgColorInv = '#99e3ca';
		bgColorDim = '#30333a';
		bgColorDimmer = '#2a3945';
		textColor = '#f7f9f9';
		textColorInv = '#202828';
		textColorDim = '#acd9ff';
		textColorDimmer = '#2a3945';
		textColorBold = '#ffffff';
		linkText = '#bfffbf';
		borderColor = '#8a9ba8';
		iconElement.setAttribute('data-feather', 'moon');
	} else {
		iconElement.setAttribute('data-feather', 'sun');
	}

	elements = document.querySelectorAll('.bg-color');
	elements.forEach(function (el) {
		el.style.backgroundColor = bgColor;
	});
	elements = document.querySelectorAll('.bg-color-inv');
	elements.forEach(function (el) {
		el.style.backgroundColor = bgColorInv;
	});
	elements = document.querySelectorAll('.bg-color-dim');
	elements.forEach(function (el) {
		el.style.backgroundColor = bgColorDim;
	});
	elements = document.querySelectorAll('.bg-color-dimmer');
	elements.forEach(function (el) {
		el.style.backgroundColor = bgColorDimmer;
	});
	elements = document.querySelectorAll('.text-color');
	elements.forEach(function (el) {
		el.style.color = textColor;
	});
	elements = document.querySelectorAll('.text-color-inv');
	elements.forEach(function (el) {
		el.style.color = textColorInv;
	});
	elements = document.querySelectorAll('.text-color-dim');
	elements.forEach(function (el) {
		el.style.color = textColorDim;
	});
	elements = document.querySelectorAll('.text-color-dimmer');
	elements.forEach(function (el) {
		el.style.color = textColorDimmer;
	});
	elements = document.querySelectorAll('.text-color-bold');
	elements.forEach(function (el) {
		el.style.color = textColorBold;
	});
	elements = document.querySelectorAll('p a');
	elements.forEach(function (el) {
		el.style.color = linkText;
	});
	document.body.style.setProperty('--border-color', borderColor);
	document.body.style.setProperty('--bg-color', bgColor);
	document.body.style.setProperty('--bg-color-inv', bgColorInv);
	document.body.style.setProperty('--bg-color-dim', bgColorDim);
	document.body.style.setProperty('--bg-color-dimmer', bgColorDimmer);
	document.body.style.setProperty('--text-color', textColor);
	document.body.style.setProperty('--text-color-inv', textColorInv);
	document.body.style.setProperty('--text-color-dim', textColorDim);
	document.body.style.setProperty('--text-color-dimmer', textColorDimmer);
	document.body.style.setProperty('--text-color-bold', textColorBold);

	// Switch btn-outline-light to btn-outline-dark and vice-versa
	let lightButtons = document.querySelectorAll('.btn-outline-light');
	let darkButtons = document.querySelectorAll('.btn-outline-dark');
	if (isNight) {
		lightButtons.forEach(btn => {
			btn.classList.remove('btn-outline-light');
			btn.classList.add('btn-outline-dark');
		});
		darkButtons.forEach(btn => {
			btn.classList.remove('btn-outline-dark');
			btn.classList.add('btn-outline-light');
		});
	} else {
		darkButtons.forEach(btn => {
			btn.classList.remove('btn-outline-light');
			btn.classList.add('btn-outline-dark');
		});
		lightButtons.forEach(btn => {
			btn.classList.remove('btn-outline-dark');
			btn.classList.add('btn-outline-light');
		});
	}
	
	// Keep the night mode state in local storage so it persists across page loads
	if (saveToLocalStorage) {
		localStorage.setItem('darkMode', JSON.stringify(isNight));
	}

	// Toggle the dark mode version of the diagrams
	setTimeout(function() {
		let highLevelComponentsImg = document.getElementById('highLevelComponents');
		let quicStackImg = document.getElementById('quicStack');
		let pqcPlotImg = document.getElementById('pqcPlot');
		let blockDelayImg = document.getElementById('blockDelay');
		let bandwidthImg = document.getElementById('bandwidth');
		if (highLevelComponentsImg) {
			if (isNight) {
				highLevelComponentsImg.src = 'img/high-level-components-light.svg';
			} else {
				highLevelComponentsImg.src = 'img/high-level-components.svg';
			}
		}
		if (quicStackImg) {
			if (isNight) {
				quicStackImg.src = 'img/quic-stack-light.svg';
			} else {
				quicStackImg.src = 'img/quic-stack.svg';
			}
		}
		if (pqcPlotImg) {
			if (isNight) {
				pqcPlotImg.src = 'img/pqc-plot-light.svg';
			} else {
				pqcPlotImg.src = 'img/pqc-plot.svg';
			}
		}
		if (blockDelayImg) {
			if (isNight) {
				blockDelayImg.src = 'img/block-delay-light.svg';
			} else {
				blockDelayImg.src = 'img/block-delay.svg';
			}
		}
		if (bandwidthImg) {
			if (isNight) {
				bandwidthImg.src = 'img/bandwidth-light.svg';
			} else {
				bandwidthImg.src = 'img/bandwidth.svg';
			}
		}
	}, 500);

	// Update the icons
	feather.replace({
		'aria-hidden': 'true'
	});
}

// Controller for the switch toggle which changes the night mode state
function toggleDayNightIcon() {
	let nightModeToggle = document.getElementById('nightModeToggle');
	if (nightModeToggle.checked) {
		toggleNightMode(true);
	} else {
		toggleNightMode(false);
	}
}

// Initialization of the page
function init() {
	let useDarkModeByDefault = true;
	let storedDarkModeState = localStorage.getItem('darkMode');
	let isNight = storedDarkModeState !== null ? JSON.parse(storedDarkModeState) : useDarkModeByDefault;
	document.getElementById('nightModeToggle').checked = isNight;
	toggleNightMode(isNight, false, false);
}