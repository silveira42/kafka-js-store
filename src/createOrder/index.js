import { sendRequest } from "./../index.js";
import { API_HOST } from "./../env.js";

const orderForm = document.getElementById('orderForm');

if (orderForm){
	orderForm.addEventListener('submit', createOrder);
}

async function createOrder(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const order = Object.fromEntries(data.entries());

	const returnMessage = await sendRequest(JSON.stringify(order, null, 2), `${API_HOST}/api/v1/order`, `POST`);

	const htmlResult = document.getElementById('results');

	htmlResult.innerHTML = returnMessage;
}
