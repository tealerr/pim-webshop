let cartCount = parseInt(localStorage.getItem('cartCount')) || 0
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0.0

// Update the HTML with initial values
document.getElementById('cart-count').innerText = cartCount + ' items'
document.getElementById('total-price').innerText = totalPrice.toFixed(2)

function addToCart(productPrice) {
  // Use a local variable to store the product price
  const priceToAdd = parseFloat(document.getElementById('product-price').value)

  // Add the local variable to the total
  cartCount++
  totalPrice += priceToAdd

  // Update HTML with new values
  document.getElementById('cart-count').innerText = cartCount + ' items'
  document.getElementById('total-price').innerText = totalPrice.toFixed(2)

  // Store values in localStorage
  localStorage.setItem('cartCount', cartCount)
  localStorage.setItem('totalPrice', totalPrice)
}

// function addToCart(productPrice) {
//   // Retrieve current URL parameters
//   const urlParams = new URLSearchParams(window.location.search);
//   let cartCount = parseInt(urlParams.get("cartCount")) || 0;
//   let totalPrice = parseFloat(urlParams.get("totalPrice")) || 0.0;

//   // Update cart information
//   cartCount++;
//   totalPrice += productPrice;

//   // Update HTML with new values
//   document.getElementById("cart-count").innerText = cartCount + " items";
//   document.getElementById("total-price").innerText = totalPrice.toFixed(2);

//   // Update URL with new cart information
//   urlParams.set("cartCount", cartCount);
//   urlParams.set("totalPrice", totalPrice.toFixed(2));

//   // Store values in localStorage
//   localStorage.setItem("cartCount", cartCount);
//   localStorage.setItem("totalPrice", totalPrice);

//   // Update the link href and navigate to the new URL
//   document.getElementById("cart-link").href =
//     "checkout.html?" + urlParams.toString();
//   window.location.href = document.getElementById("cart-link").href;
// }
