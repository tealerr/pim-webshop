function checkTokenAndRedirect() {
    if (!localStorage.token) {
        window.location.href =
            "https://tealerr.github.io/pim-webshop/src/view/login.html"
    }
}

// Call the function when the page loads
window.onload = function () {
    checkTokenAndRedirect()
}
