document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-item.nav-link")

    navLinks.forEach(function (navLink) {
        navLink.addEventListener("click", function () {
            navLinks.forEach(function (link) {
                link.classList.remove("active")
            })
            this.classList.add("active")
        })
    })
})
