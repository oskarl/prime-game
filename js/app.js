var q;
var starts = [14, 15, 18, 22, 10];
var congrats = ['Good work!', 'Nice!', 'Got \'em!', 'Wow!', 'Great!'];
var limit = 150;

var primes = [];
for(var i = 2; i < 10000; i++)
{
	var prime = true;
	for(var j = 2; j <= Math.sqrt(i); j++)
	{
		if(i%j == 0 && i != j) {
			prime = false;
		}
	}
	if(prime) {
		primes.push(i);
	}
}

if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register('sw.js', {
		scope: './'
	}).then(function(reg) {
		console.log('Service worker has been registered for scope:'+ reg.scope);
	});
}

document.addEventListener('DOMContentLoaded', function() 
{
	var start = Math.floor(Math.random() * 5);
	q = starts[start];
	document.getElementById('q').innerHTML = q;
});

function answer () {
	var ans = parseInt(document.getElementById('guess').value);
	if(q%ans == 0 && primes.includes(ans))
	{
		q = q/ans;

		var txt = document.getElementById('q').innerHTML.split(' ');
		txt[txt.length-1] = '<strike>' + txt[txt.length-1] + '</strike>';
		txt.push(q);

		document.getElementById('q').innerHTML = txt.join(' ');
		document.getElementById('guess').classList.remove('incorrect');
		document.getElementById('guess').classList.add('correct');
	}
	else
	{
		document.getElementById('guess').classList.remove('correct');
		document.getElementById('guess').classList.add('incorrect');
	}

	document.getElementById('guess').value = '';

	if(q == 1) {
		q = Math.floor(Math.random() * (limit-1)) + 2;
		document.getElementById('submit').disabled = true;
		setTimeout(() => {
			var msg = Math.floor(Math.random() * 5);
			document.getElementById('q').innerHTML = congrats[msg];

			setTimeout(() => {
				document.getElementById('submit').disabled = false;
				document.getElementById('q').innerHTML = q;
			}, 500);
		}, 600);
	}
	else
	{
		document.getElementById('guess').focus();
	}
}

function openSettings () {
	document.getElementById('game').style.display = 'none';
	document.getElementById('settings').style.display = '';
}

function openGame () {
	document.getElementById('game').style.display = '';
	document.getElementById('settings').style.display = 'none';
}

function openList () {
	if(document.getElementById('prime-list').innerHTML == '') {
		var str = '';
		primes.forEach((p) => {
			str += p + '<br />';
		});
		document.getElementById('prime-list').innerHTML = str;
	}
	document.getElementById('list').style.display = '';
	document.getElementById('settings').style.display = 'none';
}

function goBack () {
	document.getElementById('settings').style.display = '';
	document.getElementById('list').style.display = 'none';
}