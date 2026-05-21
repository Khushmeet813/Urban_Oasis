const menuItems = [
    { id: 1, name: "Creamy Chocolate", price: 50, image: "Images/chocoIce.jpg", category: "classic" },
    { id: 2, name: "Roasted Pistachio", price: 70, image: "Images/pistachio.jpg", category: "classic" },
    { id: 3, name: "Sweet Strawberry", price: 60, image: "Images/strawberry.jpg", category: "classic" },
    { id: 4, name: "Fudge Brownie", price: 160, image: "Images/brownie.jpg", category: "sundaes" },
    { id: 5, name: "Cookie butter Crunch", price: 240, image: "Images/crunch.jpg", category: "sundaes" },
    { id: 6, name: "Tropical mango", price: 70, image: "Images/mango.jpg", category: "tropical" },
    { id: 7, name: "Rainbow Pallete", price: 150, image: "Images/rainbow.jpg", category: "limited" }
];

const toppingItems = [
    { id: 101, name: "Rainbow Skittles", price: 15 },
    { id: 102, name: "Choco Chips", price: 10 },
    { id: 103, name: "Gummy Bears", price: 15 },
    { id: 104, name: "Roasted Almonds", price: 20 },
    { id: 105, name: "Hot Fudge Sauce", price: 25 }
];

let cart = [];
let favorites = [];
let selectedToppings = []; 
let total = 0;
let isOrderPlaced = false;
let currentCategory = 'all';

window.onload = function() {
    filterCategory('all');
    renderToppingsBar();
    renderCart();
    renderFavoritesList();
};

function showToast(message) {
    const toast = document.getElementById('notification-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2500);
}

function renderToppingsBar() {
    const container = document.getElementById('toppings-container');
    if (!container) return;
    container.innerHTML = "";

    toppingItems.forEach(topping => {
        const isSelected = selectedToppings.some(t => t.id === topping.id);
        const activeClass = isSelected ? 'topping-card active-topping' : 'topping-card';
        
        container.innerHTML += `
            <div class="${activeClass}" onclick="toggleToppingSelection(${topping.id})">
                <span class="topping-checkbox">${isSelected ? '✅' : '➕'}</span>
                <strong>${topping.name}</strong>
                <span class="topping-price-tag">+₹${topping.price}</span>
            </div>
        `;
    });
}

function toggleToppingSelection(id) {
    const topping = toppingItems.find(t => t.id === id);
    if (!topping) return;

    const index = selectedToppings.findIndex(t => t.id === id);
    if (index > -1) {
        selectedToppings.splice(index, 1);
    } else {
        selectedToppings.push(topping);
    }
    renderToppingsBar();
}

function filterCategory(categoryName) {
    currentCategory = categoryName;
    const container = document.getElementById('menu-container');
    const title = document.getElementById('menu-title');
    
    if (!container || !title) return;

    title.innerText = categoryName === 'all' 
        ? "Our Menu" 
        : categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        
    container.innerHTML = "";

    const filteredItems = categoryName === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === categoryName);

    filteredItems.forEach(item => {
        const cardClass = item.category === 'sundaes' ? 'dessert' : 'drinks';
        const isFav = favorites.some(fav => fav.id === item.id);
        const heartIcon = isFav ? '❤️' : '🤍';
        
        container.innerHTML += `
            <div class="${cardClass}">
                <div class="card-image-wrapper" onclick="addToCartById(${item.id})">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="fav-card-btn" onclick="toggleFavorite(event, ${item.id})">${heartIcon}</button>
                </div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="addToCartById(${item.id})">Add to Order</button>
            </div>
        `;
    });
}

function togglePanel(panelId, open) {
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('panel-overlay');
    if (!panel || !overlay) return;
    
    if (open) {
        document.querySelectorAll('.side-panel').forEach(p => {
            if(p.id !== panelId) p.classList.remove('active');
        });
        if(panelId === 'cart-panel' && isOrderPlaced) {
            isOrderPlaced = false;
            renderCart();
        }
        panel.classList.add('active');
        overlay.classList.add('active');
    } else {
        panel.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function closeAllPanels() {
    document.querySelectorAll('.side-panel').forEach(panel => panel.classList.remove('active'));
    const overlay = document.getElementById('panel-overlay');
    if (overlay) overlay.classList.remove('active');
}

function toggleFavorite(e, id) {
    if (e && e.stopPropagation) { e.stopPropagation(); }
    
    const item = menuItems.find(m => m.id === id);
    if (!item) return;
    const index = favorites.findIndex(fav => fav.id === id);

    if (index > -1) {
        favorites.splice(index, 1);
        showToast(`💔 Removed ${item.name} from Saved List`);
    } else {
        favorites.push(item);
        showToast(`❤️ Saved ${item.name}!`);
    }

    const favCountEl = document.getElementById('favCount');
    if (favCountEl) favCountEl.innerText = favorites.length;
    
    renderFavoritesList();
    filterCategory(currentCategory);
}

function renderFavoritesList() {
    const favItemsContainer = document.getElementById('fav-items');
    if (!favItemsContainer) return;

    let output = "";
    if (favorites.length === 0) {
        output = `<p class="empty-message">No flavors saved yet!</p>`;
    } else {
        favorites.forEach(item => {
            output += `
                <li class="panel-item-layout">
                    <img src="${item.image}" alt="${item.name}" class="panel-item-thumb">
                    <div class="panel-item-details">
                        <strong>${item.name}</strong>
                        <span class="item-price-tag">₹${item.price}</span>
                    </div>
                    <span class="remove-item" onclick="toggleFavorite(event, ${item.id})">&times;</span>
                </li>`;
        });
    }
    favItemsContainer.innerHTML = output;
}

function addToCartById(id) {
    if(isOrderPlaced) { isOrderPlaced = false; }

    const item = menuItems.find(m => m.id === id);
    if (!item) return;

    const toppingsSignature = selectedToppings.map(t => t.id).sort().join(',');
    
    const existingItem = cart.find(cartItem => 
        cartItem.id === id && 
        cartItem.toppingsSignature === toppingsSignature
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            id: item.id, 
            name: item.name, 
            price: item.price, 
            image: item.image, 
            quantity: 1,
            toppings: [...selectedToppings],
            toppingsSignature: toppingsSignature
        });
    }
    
    showToast(`🍦 Added ${item.name} to order tray!`);
    
    selectedToppings = []; 
    renderToppingsBar();
    
    calculateTotal();
    renderCart();
}

function updateQuantity(index, change) {
    if (!cart[index]) return;
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) { cart.splice(index, 1); }
    calculateTotal();
    renderCart();
}

function removeCartItem(index) {
    if (!cart[index]) return;
    const name = cart[index].name;
    cart.splice(index, 1);
    showToast(`🗑️ Removed ${name}`);
    calculateTotal();
    renderCart();
}

function calculateTotal() {
    total = cart.reduce((sum, item) => {
        const toppingsUnitCost = item.toppings.reduce((tSum, top) => tSum + top.price, 0);
        return sum + ((item.price + toppingsUnitCost) * item.quantity);
    }, 0);
}

function processCheckout() {
    const cartItemsEl = document.getElementById('cart-items');
    if (!cartItemsEl) return;

    if(cart.length === 0) {
        showToast("⚠️ Your tray is empty. Add flavors before checking out!");
        return;
    }

    isOrderPlaced = true;
    const finalBillAmount = total;
    const purchasedItemsSnapshot = [...cart];

    let itemBreakdownHTML = "";
    purchasedItemsSnapshot.forEach(item => {
        let extrasArray = item.toppings.map(t => t.name);
        
        extrasArray.push("Free Candy 🍬");
        if (item.quantity >= 2) {
            extrasArray.push("Free Waffle Cone 🍦");
        }

        const toppingsText = `<div style="font-size:11px; color:#2E2926; margin-top:2px;">Includes: ${extrasArray.join(', ')}</div>`;
        const itemBaseAndToppingPrice = item.price + item.toppings.reduce((s, t) => s + t.price, 0);

        itemBreakdownHTML += `
            <div style="display: flex; flex-direction: column; font-size: 13px; color: #2E2926; margin-bottom: 8px; font-family: sans-serif; width: 100%; border-bottom: 1px dashed #CDC6C3; padding-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; width: 100%;">
                    <span>${item.name} <strong>x${item.quantity}</strong></span>
                    <span>₹${itemBaseAndToppingPrice * item.quantity}</span>
                </div>
                ${toppingsText}
            </div>
        `;
    });
    
    cartItemsEl.innerHTML = `
        <div class="order-success-container">
            <div class="success-icon">🎉</div>
            <h2 style="font-weight: normal;">Order Placed Successfully!</h2>
            <p style="font-size: 13px; line-height: 1.4; color: #A38F85; margin-bottom: 15px; font-family: sans-serif;">
                We are packing your scoops in insulated wrappers to ensure zero melting!
            </p>
            <div style="width: 100%; background: #FFFFFF; padding: 12px; border-radius: 8px; margin-bottom: 10px; box-sizing: border-box; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <div style="font-weight: bold; font-size: 12px; margin-bottom: 8px; text-align: left; text-transform: uppercase; color: #A38F85;">Receipt Summary:</div>
                ${itemBreakdownHTML}
            </div>
            <div class="success-total-banner">Total Paid: ₹${finalBillAmount}</div>
        </div>
    `;
    
    const footerActions = document.getElementById('cart-footer-actions');
    if (footerActions) footerActions.style.display = 'none';
    
    cart = [];
    total = 0;
    
    const cartCountEl = document.getElementById('cartCount');
    const cartTotalEl = document.getElementById('cart-total');
    if (cartCountEl) cartCountEl.innerText = "0";
    if (cartTotalEl) cartTotalEl.innerText = "0";
    
    showToast("🚀 Kitchen received your order!");
}

function renderCart() {
    const actionsFooter = document.getElementById('cart-footer-actions');
    const cartItemsEl = document.getElementById('cart-items');
    if (!cartItemsEl) return;

    if (isOrderPlaced) {
        if (actionsFooter) actionsFooter.style.display = 'none';
        return;
    }
    
    if (actionsFooter) actionsFooter.style.display = 'block';
    let output = "";
    let itemsCount = 0;

    if (cart.length === 0) {
        output = `<p class="empty-message">Your order tray is empty!</p>`;
    } else {
        cart.forEach((item, i) => {
            itemsCount += item.quantity;
            const itemToppingsPrice = item.toppings.reduce((s, t) => s + t.price, 0);
            const totalRowCost = (item.price + itemToppingsPrice) * item.quantity;

            let giftStrings = item.toppings.map(t => t.name);
            
            giftStrings.push("1x Free Candy 🍬"); 
            if (item.quantity >= 2) {
                giftStrings.push("1x Free Waffle Cone 🍦"); 
            }

            const toppingsListDesc = `<div style="font-size:11px; color:#2E2926; font-weight:normal; margin-top:2px;">+ ${giftStrings.join(', ')}</div>`;

            output += `
                <li class="panel-item-layout">
                    <img src="${item.image}" alt="${item.name}" class="panel-item-thumb">
                    <div class="panel-item-details">
                        <strong>${item.name}</strong>
                        ${toppingsListDesc}
                        <span class="item-price-tag">₹${totalRowCost}</span>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQuantity(${i}, -1)">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${i}, 1)">+</button>
                        </div>
                    </div>
                    <span class="remove-item" onclick="removeCartItem(${i})">&times;</span>
                </li>`;
        });
    }

    cartItemsEl.innerHTML = output;
    
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cartCount');
    if (cartTotalEl) cartTotalEl.innerText = total;
    if (cartCountEl) cartCountEl.innerText = itemsCount;
}