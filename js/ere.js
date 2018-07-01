
//modal box
	const modal = document.getElementById('modal-box');
	const refresh = document.getElementById('refreshBtn');
	const dismissBtn = document.getElementById('dismissBtn');

const ereModal = () => {
	modal.style.display = 'block';

	dismissBtn.onclick = () => {
	    modal.style.display = "none";
	}
	window.onclick = (event) => {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
}
//modal box end
const select = document.getElementById('ere');
const select2 = document.getElementById('ere2');
  fetch('https://free.currencyconverterapi.com/api/v5/currencies')
.then(response => response.json())
.then((mycurrency) => {
  const currencys = mycurrency.results;
  for (const currency in currencys){
   select.innerHTML += `<option value = "${currencys[currency].id}"> ${currencys[currency].id} (${currencys[currency].currencyName})</option>`;
	 select2.innerHTML += `<option value = "${currencys[currency].id}"> ${currencys[currency].id} (${currencys[currency].currencyName})</option>`;
		}
});

const show = () => {
  const outputBox = document.getElementById("show");
    const inputBox = document.getElementById('input');
    const UserInput = inputBox.value;
    const from = select.value;
    const to = select2.value;

    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=ultra`)
.then(response => response.json())
.then((jsonResonse) => {
    const currency = jsonResonse[`${from}_${to}`];
    let cal = (Math.round(currency*UserInput));
    outputBox.innerHTML = cal;
});
  }

	const convertBtn = document.getElementById('convertBtn');

	convertBtn.onclick = () => {
	    show();
	}
  // service worker registeration'
  const Erecontroller = this;

    navigator.serviceWorker.register('sw.js').then((reg) => {
      console.log('Registeration worked!', reg.scope);
      if (reg.waiting) {
        Erecontroller._updateReady(reg.waiting);
        return;
      }

      if (reg.installing) {
        Erecontroller._trackInstalling(reg.installing);
        return;
      }

      reg.addEventListener('updatefound', () => {
        Erecontroller._trackInstalling(reg.installing);
        return;
      });

      let refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
      });



    });

this._trackInstalling = (worker) => {
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      console.log('installed');
      Erecontroller._updateReady(worker);
    }
  });
 }

this._updateReady = (worker) => {
	console.log("Update found");
    Erecontroller._showAlert('New version available');

		refresh.addEventListener ('click', () => {worker.postMessage({ action: 'skipWaiting' }); modal.style.display = "none"; });
  }

  this._showAlert = (message) => {
    console.log(message);
    const DisplayMessage = document.getElementById('display');
    DisplayMessage.innerHTML = message;
		ereModal();
  }

  //database
2
