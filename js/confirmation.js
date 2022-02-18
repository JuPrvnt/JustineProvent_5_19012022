const params = new URL(window.location).searchParams;
const orderId = params.get("id");

document.getElementById("orderId").textContent = orderId;
