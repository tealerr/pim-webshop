// Function to retrieve query parameters from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
}

// Update cart count and total price based on query parameters
document.addEventListener("DOMContentLoaded", function () {
    const cartCount = getQueryParam("cartCount") || 0
    let totalPrice = parseFloat(getQueryParam("totalPrice")) || 0.0

    // Check if totalPrice is NaN, and set it to 0.0
    if (isNaN(totalPrice)) {
        totalPrice = 0.0
    }

    // Update HTML with values
    document.getElementById("cart-count").innerText = cartCount + " items"
    document.getElementById("total-price").innerText =
        "THB " + totalPrice.toFixed(2)
})
