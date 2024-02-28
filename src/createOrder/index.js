async function createOrder(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const formJSON = Object.fromEntries(data.entries());

  const order = JSON.stringify(formJSON, null, 2);
  const returnMessage = await sendRequest(order, `http://192.168.15.189:3000/api/v1/order`, `POST`);

	const htmlResult = document.getElementById('results');

	htmlResult.innerHTML = returnMessage;
}

const orderForm = document.getElementById('orderForm');
if (orderForm){
  orderForm.addEventListener('submit', createOrder);
}

const sendRequest = async (body, url, method) => {
	let options = '';

	if (method === 'GET') {

		options = {
			method,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} else {
		// Default options are marked with *
		options = {
			method, // *GET, POST, PUT, DELETE, etc.
			// mode: 'same-origin', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'omit', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body,
		};
	}

	try {
		const response = await fetch(url, options)

		const apiResponse = await response.json()

		if (response.status < 200 || response.status >= 300) {
			return `Error: ${apiResponse.message}`
		} else {
			return `Success! Order Id: ${apiResponse.orderId}`;
		}
	} catch (exception) {
		return `Error: ${exception.message}`
	}
}
