const orderBoard = document.querySelector('#order_board');
const payButton = document.querySelector('#pay_button');


const prices = {
    "Hot Americano": 4000,
    "Ice Americano": 4000,
    "Hot Latte": 5000,
    "Ice Latte": 5000,
    "Berry Ade": 4000,
    "Lime Ade": 4000,
    "Peach Ade": 5000,
    "Plum Ade": 5000,
    "Choco Frappe": 4000,
    "Green Frappe": 4000,
    "Kiwi Frappe": 5000,
    "Orange Frappe": 5000
};

function menu_tab_move(e) {
    let menuTabNameId = e.currentTarget;
    let menuTabName = menuTabNameId.innerText;
    let menuBoard = document.getElementById("menu_board");
    if (menuTabName == 'coffee') {
        menuBoard.innerHTML = `
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="./src/coffee/hot_americano.png" alt="">
                </div>
                <div class="menu_name" id="Hot_A">Hot Americano</div>
                <div class="menu_price" id="HA_P">4000원</div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="./src/coffee/ice_americano.png" alt="">
                </div>
                <div class="menu_name" id="Ice_A">Ice Americano</div>
                <div class="menu_price" id="IA_P">4000원</div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="./src/coffee/hot_latte.png" alt="">
                </div>
                <div class="menu_name" id="Hot_L">Hot Latte</div>
                <div class="menu_price" id="HL_P">5000원</div>
            </section>
            <section class="menu_sec">
                <div class="img_wrap">
                    <img src="./src/coffee/ice_latte.png" alt="">
                </div>
                <div class="menu_name" id="Ice_L">Ice Latte</div>
                <div class="menu_price" id="IL_P">5000원</div>
            </section>
        `;
        const newMenuSections = menuBoard.querySelectorAll('.menu_sec');
        newMenuSections.forEach(function(menuSection) {
            menuSection.addEventListener('click', total_menu_count);
            });
    }else if (menuTabName=='ade') {
        menuBoard.innerHTML = `
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/ade/berry_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Hot_A">Berry Ade</div>
            <div class="menu_price" id="HA_P">4000원</div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/ade/lime_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Ice_A">Lime Ade</div>
            <div class="menu_price" id="IA_P">4000원</div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/ade/peach_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Hot_L">Peach Ade</div>
            <div class="menu_price" id="HL_P">5000원</div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/ade/plum_Ade.png" alt="">
            </div>
            <div class="menu_name" id="Ice_L">Plum Ade</div>
            <div class="menu_price" id="IL_P">5000원</div>
        </section>
        `;
        const newMenuSections = menuBoard.querySelectorAll('.menu_sec');
        newMenuSections.forEach(function(menuSection) {
            menuSection.addEventListener('click', total_menu_count);
            });
    }else {
        menuBoard.innerHTML = `
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/blended/choco_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Hot_A">Choco Frappe</div>
            <div class="menu_price" id="HA_P">4000원</div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/blended/green_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Ice_A">Green Frappe</div>
            <div class="menu_price" id="IA_P">4000원</div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/blended/kiwi_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Hot_L">Kiwi Frappe</div>
            <div class="menu_price" id="HL_P">5000원</div>
        </section>
        <section class="menu_sec">
            <div class="img_wrap">
                <img src="./src/blended/orange_frappe.png" alt="">
            </div>
            <div class="menu_name" id="Ice_L">Orange Frappe</div>
            <div class="menu_price" id="IL_P">5000원</div>
        </section>
        `;
        const newMenuSections = menuBoard.querySelectorAll('.menu_sec');
        newMenuSections.forEach(function(menuSection) {
            menuSection.addEventListener('click', total_menu_count);
            });
    }
};

function total_menu_count(e) {
    let menu = e.currentTarget;
    let menuName = menu.querySelector(".menu_name").innerText;
    let menuPrice = prices[menuName];

    let orderSection = document.createElement('section');
    orderSection.classList.add('order_sec');
    orderSection.innerHTML = `
        <p class="order_menu_name">${menuName}</p>
        <p class="order_menu_cnt">1</p>
        <p class="order_menu_price">${menuPrice}</p>
        <button class="click_button" onclick="menu_plus(this)">+</button>
        <button class="click_button" onclick="menu_down(this)">-</button>
        <button class="click_button" onclick="menu_remove(this)">x</button>
    `;
    orderBoard.appendChild(orderSection);
}

function menu_plus(button) {
    let cnt = button.parentElement.querySelector('.order_menu_cnt');
    let menuName = button.parentElement.querySelector('.order_menu_name');
    let menuPrice = button.parentElement.querySelector('.order_menu_price');
    cnt.innerText = Number(cnt.innerText) + 1;
    menuPrice.innerText = Number(cnt.innerText)*Number(prices[menuName.innerText]);
}

function menu_down(button) {
    let cnt = button.parentElement.querySelector('.order_menu_cnt');
    let menuName = button.parentElement.querySelector('.order_menu_name');
    let menuPrice = button.parentElement.querySelector('.order_menu_price');
    cnt.innerText = Math.max(1, Number(cnt.innerText) - 1);
    menuPrice.innerText = Number(cnt.innerText)*Number(prices[menuName.innerText]);
}

function menu_remove(button) {
    button.parentElement.remove();
}

function calculateTotalPrice() {
    let orderSections = document.querySelectorAll('.order_sec');
    let total = 0;
    orderSections.forEach(orderSection => {
        let priceElement = orderSection.querySelector('.order_menu_price');
        let countElement = orderSection.querySelector('.order_menu_cnt');
        if (priceElement && countElement) {
            let price = parseInt(priceElement.innerText);
            let count = parseInt(countElement.innerText);
            total += price * count;
        }
    });
    return total;
}

document.addEventListener('DOMContentLoaded', function() {
    const menuSections = document.querySelectorAll('.menu_sec');
    const menuTabs = document.querySelectorAll('.tab-list_trans');
    menuSections.forEach(function(menuSection) {
        menuSection.addEventListener('click', total_menu_count);
    });
    menuTabs.forEach(function(menuTab) {
        menuTab.addEventListener('click', menu_tab_move);
    });
    payButton.addEventListener('click', function() {
        let totalPrice = calculateTotalPrice();
        localStorage.setItem('totalPrice', totalPrice.toString());
        window.location.href = 'credit.html';
    });
});