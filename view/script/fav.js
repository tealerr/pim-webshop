document.addEventListener("DOMContentLoaded", function () {
    console.log("fav.js is executed")
    const link = document.createElement("link")
    link.rel = "icon"
    link.type = "image/png"
    link.sizes = "32x32"
    link.href = "../image/fav_pim.png"

    document.head.appendChild(link)
})
