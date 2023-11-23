$("header").html(`
    <div class="line">
            <div class="box">
                <div class="m-12 l-2">
                    <img class="full-img logo" src="../../image/logoSmartShop.jpg" alt="logo">
                </div>
                <div class="m-12 l-8 right">
                    <div class="margin">
                        <form class="customform m-12 l-8" method="get" action="http://google.com/">
                            <div class="s-9">
                                <input type="text" placeholder="Search form" title="Search form" />
                            </div>
                            <div class="s-3"><button type="submit">Search</button></div>
                        </form>
                        <div class="m-12 l-4">
                            <a href="../checkout.html?from=2" id="cart-link" onclick="addToCart()">
                                <p id="renderCart" class="right cart">
                                    <i class="fa fa-shopping-cart" style="font-size:24px""></i>
                                    <b id=" cart-count">${
                                      myCart.length
                                    } items</b> / THB 
                                    <span id="total-price">${numberWithCommas(
                                      netAmount.toFixed(2),
                                    )}</span>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- TOP NAV -->
        <div class="line">
            <nav>
                <div class="top-nav">
                    <ul class="right">
                        <li><a href="../homepage.html">หน้าหลัก</a></li>
                        <li>
                            <a>หมวดหมู่สินค้า</a>
                            <ul>
                                <li><a href="../../page/souvenir/uniformAccessory.html">อุปกรณ์ชุดนักศึกษา</a></li>
                                <li><a href="../../page/souvenir/poloAndTshirt.html">เสื้อโปโลและเสื้อยืด</a></li>
                                <li><a href="../../page/souvenir/hoodAndLongShirt.html">เสื้อฮู้ดและเสื้อแขนยาว</a></li>
                                <li><a href="../../page/souvenir/giftBasket.html">กระเช้าของขวัญ</a></li>
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
            </nav>
        </div>`);

$("#header2").html(`
    <div class="line">
            <div class="box">
                <div class="m-12 l-2">
                    <img class="full-img logo" src="../../image/logoSmartShop.jpg" alt="logo">
                </div>
                <div class="m-12 l-8 right">
                    <div class="margin">
                        <form class="customform m-12 l-8" method="get" action="http://google.com/">
                            <div class="s-9">
                                <input type="text" placeholder="Search form" title="Search form" />
                            </div>
                            <div class="s-3"><button type="submit">Search</button></div>
                        </form>
                        <div class="m-12 l-4">
                            <a href="../../checkout.html?from=2" id="cart-link" onclick="addToCart()">
                                <p id="renderCart" class="right cart">
                                    <i class="fa fa-shopping-cart" style="font-size:24px""></i>
                                    <b id=" cart-count">${
                                      myCart.length
                                    } items</b> / THB 
                                    <span id="total-price">${numberWithCommas(
                                      netAmount.toFixed(2),
                                    )}</span>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- TOP NAV -->
        <div class="line">
            <nav>
                <div class="top-nav">
                    <ul class="right">
                        <li><a href="../homepage.html">หน้าหลัก</a></li>
                        <li>
                            <a>หมวดหมู่สินค้า</a>
                            <ul>
                                <li><a href="../../page/souvenir/uniformAccessory.html">อุปกรณ์ชุดนักศึกษา</a></li>
                                <li><a href="../../page/souvenir/poloAndTshirt.html">เสื้อโปโลและเสื้อยืด</a></li>
                                <li><a href="../../page/souvenir/hoodAndLongShirt.html">เสื้อฮู้ดและเสื้อแขนยาว</a></li>
                                <li><a href="../../page/souvenir/giftBasket.html">กระเช้าของขวัญ</a></li>
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
            </nav>
        </div>`);
