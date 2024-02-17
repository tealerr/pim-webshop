var banner = "../image/pimlogo.png"
var imhere = window.location.href
if (
    String(imhere).includes("aviAccesory") ||
    String(imhere).includes("menAccessory") ||
    String(imhere).includes("femaleAccessory")
) {
    banner = "../../image/pimlogo.png"
}

$("header").html(`
    <div class="line">
         
        <!-- TOP NAV -->
        <div class="line">
            <div style="height: 30px; background: #28a745; padding-top: 10px; padding-right: 30px;">
                <a href="../checkout.html?cartCount=0&totalPrice=0.00&from=2" id="cart-link" onclick="addToCart()">
                    <p id="renderCart" class="right cart" style="color: #fff;">
                        <i class="fa fa-shopping-cart" style=" font-size:24px; color: #fff;"></i>
                        <b id=" cart-count" style="color: #fff">${
                            myCart.length
                        } items</b> / THB 
                        <span id="total-price">${numberWithCommas(
                            netAmount.toFixed(2)
                        )}</span>
                    </p>
                </a>
            </div>
            <nav>
                <div class="top-nav " style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <img class="full-img logo" src="${banner}" alt="logo" style="width: 200px; margin-left: 10px; object-fit: contain;">
                    <div style="width: fit-content;">
                        <div class="customform " method="get" >
                            <div style="display: flex">
                                <input id="txt_search" type="text" placeholder="Search form" title="Search form" style="width: 400px; margin-bottom: 0; padding: 10px; border: 1px solid #e5e5e5; border-radius: 5px;" />
                                <div  onclick="searchItems()" style="margin-bottom: 0; border: 1px solid #fff; margin-left: 10px; display: flex; justify-content: center; align-items: center; padding: 10px 20px; color: #fff; border-radius: 5px; cursor: pointer;">Search</div>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; align-items: center; margin-right: 10px;">
                        <ul class="right">
                            <li><a href="../homepage.html">หน้าหลัก</a></li>
                            <li>
                                <a>หมวดหมู่สินค้า</a>
                                <ul>
                                    <li><a href="../souvenir/uniformAccessory.html">อุปกรณ์ชุดนักศึกษา</a></li>
                                    <li><a href="../souvenir/poloAndTshirt.html">เสื้อโปโลและเสื้อยืด</a></li>
                                    <li><a href="../souvenir/hoodAndLongShirt.html">เสื้อฮู้ดและเสื้อแขนยาว</a></li>
                                    <li><a href="../souvenir/giftBasket.html">กระเช้าของขวัญ</a></li>
                                </ul>
                            </li>
                            <li>
                                <a>เกี่ยวกับเรา</a>
                                <ul>
                                    <li><a>รายละเอียดของร้าน</a></li>
                                    <li><a>ตำแหน่งที่ตั้ง</a></li>
                                </ul>
                            </li>
                            <li><a href="https://www.facebook.com/shopforpimsmart" target="blank">ติดต่อเรา</a></li>
                        </ul>
                        
                    </div>
                    
                </div>
            </nav>
        </div>`)

function searchItems() {
    var searchText = $("#txt_search").val()
    window.location.href = `./uniformAccessory.html?search=${searchText}`
}

$("#txt_search").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which
    if (keycode == "13") {
        searchItems()
    }
})
