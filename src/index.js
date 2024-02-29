export const sendRequest = async (body, url, method) => {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
	};

	if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
		options.body = body
	}

	console.log(url, options);

	try {
		const response = await fetch(url, options)

		const apiResponse = await response.json()

		if (response.status < 200 || response.status >= 300) {
			return `Error: ${apiResponse.message}`
		} else {
			return `Success! Order Id: ${apiResponse.orderId}`;
		}
	} catch (error) {
		return `Error: ${error.message}`
	}
}
