const menuItems = [
    { 
        id: 1, 
        name: "Espresso", 
        price: 120, 
        image: "Images/espresso.jpg", 
        category: "coffee",
        rating: 4.8,
        special: "Intense, robust extraction crafted from dark-roast Arabica beans. Provides a pure coffee punch with a thick, golden crema layer.",
        ingredients: "100% Fine Ground Arabica Coffee Beans, Purified Hot Water."
    },
    { 
        id: 2, 
        name: "Iced Latte", 
        price: 100, 
        image: "Images/latte.jpg", 
        category: "coffee",
        rating: 4.5,
        special: "Smooth, velvety, and wonderfully refreshing. Perfectly balanced espresso poured over chilled, creamy milk and crisp ice crystals.",
        ingredients: "Espresso Roast Coffee, Whole Milk, Ice Blocks (Optional Vanilla / Caramel syrups)."
    },
    { 
        id: 3, 
        name: "Cappuccino", 
        price: 150, 
        image: "Images/cappuccino.jpg", 
        category: "coffee",
        rating: 4.7,
        special: "An authentic Italian standard. Built on a perfect third-ratio division of bold espresso base, hot steamed milk, and rich micro-foam skin.",
        ingredients: "Sourced House Blend Espresso, Steamed Fresh Milk, Dense Foam Topping, Dusting Cocoa Powder."
    },
    { 
        id: 4, 
        name: "Chocolate Milkshake", 
        price: 80, 
        image: "Images/milkshake.jpg", 
        category: "non-coffee",
        rating: 4.6,
        special: "The absolute comfort treatment. Premium dark cocoa blends blended directly with luxurious premium vanilla bean ice cream base.",
        ingredients: "Cocoa Fudge, Artisan Vanilla Ice Cream, Heavy Whole Milk, Whipped Cream Swirl.",
    },
    { 
        id: 5, 
        name: "Lemonade", 
        price: 60, 
        image: "Images/lemonade.jpg", 
        category: "non-coffee",
        rating: 4.2,
        special: "Zesty, crisp citrus punch targeted to revitalize your system instantly. Prepared fresh from newly picked local orchard lemons.",
        ingredients: "Freshly Squeezed Citrus Lemon Juice, Infused Pure Cane Sugar, Chilled Water, Organic Mint Leaves.",
    },
    { 
        id: 6, 
        name: "Smoothie", 
        price: 70, 
        image: "Images/Smoothie.jpg", 
        category: "non-coffee",
        rating: 4.4,
        special: "Packed tight with vitamins and energy. A creamy combination of selected sun-ripened mixed berries and organic structural bases.",
        ingredients: "Wild Strawberries, Blueberries, Frozen Greek Yogurt Base, Splash of Organic Honey.",
    },
    { 
        id: 7, 
        name: "Masala Chai", 
        price: 40, 
        image: "Images/chai.jpg", 
        category: "tea",
        rating: 4.9,
        special: "A warming aromatic escape. Traditional premium Assam tea leaves simmered carefully with a house-secret crushed exotic spice blend.",
        ingredients: "Assam Black Tea Leaves, Crushed Ginger, Green Cardamom, Cloves, Fresh Milk, Water.",
    },
    { 
        id: 8, 
        name: "Black Tea", 
        price: 50, 
        image: "Images/blacktea.jpg", 
        category: "tea",
        rating: 4.1,
        special: "Bold, clean, elegant and full-bodied classic extraction. Ideal pairing to cleanse the palette alongside heavy dessert options.",
        ingredients: "Premium Loose-Leaf Black Tea Extracts, Purified Rolling Boiled Water.",
    },
    { 
        id: 9, 
        name: "Green Tea", 
        price: 50, 
        image: "Images/greentea.jpg", 
        category: "tea",
        rating: 4.3,
        special: "Sourced directly from organic mountain fields. Subtle earthy undertones overflowing with antioxidant health benefits.",
        ingredients: "Steeped Whole Green Tea Leaves, Pure Warm Water.",
    },
    { 
        id: 10, 
        name: "Chocolate Cake", 
        price: 300, 
        image: "Images/cake.jpg", 
        category: "desserts",
        rating: 4.9,
        special: "Sinfully rich multi-layered structure of moist chocolate sponge held tight inside gourmet Belgian fudge glaze shells.",
        ingredients: "Belgian Cocoa Compound, Fine Baking Flour, Sweet Dairy Cream, Brown Sugar Crystals.",
    },
    { 
        id: 11, 
        name: "Red Velvet Cupcake", 
        price: 75, 
        image: "Images/cupcakeV.jpg", 
        category: "desserts",
        rating: 4.7,
        special: "Light, airy velvet crumb texture featuring an iconic signature crimson color profile. Balanced elegantly by rich tangy dairy frosting.",
        ingredients: "Buttermilk Velvet Sponge, Authentic Cream Cheese Frosting, Premium Vanilla Essence.",
    },
    { 
        id: 12, 
        name: "Donuts", 
        price: 80, 
        image: "Images/donuts.jpg", 
        category: "desserts",
        rating: 4.5,
        special: "Freshly fried golden yeast dough rings displaying a soft, pillow-like airy pull. Topped with glossy multi-flavor glaze rings.",
        ingredients: "Leavened Pastry Dough, Sweet Sugar Glazing Coat, Decorative Sprinkles."
    }
];

let cart = [];
let favorites = [];
let total = 0;
let isOrderPlaced = false;

window.onload = function() {
    filterCategory('all');
    renderCart();
    renderFavoritesList();
};

function showToast(message) {
    const toast = document.getElementById('notification-toast');
    toast.innerText = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function filterCategory(categoryName) {
    const container = document.getElementById('menu-container');
    const title = document.getElementById('menu-title');
    
    if (categoryName === 'all') {
        title.innerText = "Our Full Menu";
    } else if (categoryName === 'non-coffee') {
        title.innerText = "Non-Coffee Menu";
    } else {
        title.innerText = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    }
    
    container.innerHTML = "";

    const filteredItems = categoryName === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === categoryName);

    filteredItems.forEach(item => {
        const cardClass = item.category === 'desserts' ? 'dessert' : 'drinks';
        const isFav = favorites.some(fav => fav.id === item.id);
        const heartIcon = isFav ? '❤️' : '🤍';
        const activeClass = isFav ? 'active' : '';
        
        container.innerHTML += `
            <div class="${cardClass}">
                <div class="card-image-wrapper" onclick="showProductDetails(${item.id})">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="fav-card-btn ${activeClass}" onclick="event.stopPropagation(); toggleFavorite(${item.id})">${heartIcon}</button>
                    <div class="click-prompt-overlay">✨ Click to view recipe secrets & ratings</div>
                </div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <button onclick="addToCartById(${item.id})">Add to Cart</button>
            </div>
        `;
    });
}

function showProductDetails(id) {
    const item = menuItems.find(m => m.id === id);
    if (!item) return;
    
    const detailsBody = document.getElementById('details-body');
    document.getElementById('details-title').innerText = item.name;
    
    detailsBody.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="details-hero-img">
        
        <div class="details-meta-row">
            <span class="details-price">₹${item.price}</span>
            <span class="details-rating">⭐ ${item.rating} / 5.0</span>
        </div>
        
        <div>
            <div class="details-section-title">What Makes It Special</div>
            <p class="details-text">${item.special || "Crafted fresh with handpicked natural ingredients by our premier barista teams."}</p>
        </div>
        
        <div>
            <div class="details-section-title">Ingredients Sourcing</div>
            <p class="details-text">${item.ingredients || "Organic dairy bases, natural sweeteners, filtered mineral water solutions."}</p>
        </div>
        
        <button style="width: 100%; margin-top: 15px; padding: 12px; border-radius: 8px;" onclick="addToCartById(${item.id})">
            Add This Item To Order (₹${item.price})
        </button>
    `;
    
    togglePanel('details-panel', true);
}

function togglePanel(panelId, open) {
    const panel = document.getElementById(panelId);
    const overlay = document.getElementById('panel-overlay');
    
    if (open) {
        if (panelId !== 'details-panel') {
            document.querySelectorAll('.side-panel').forEach(p => {
                if(p.id !== panelId) p.classList.remove('active');
            });
        } else {
            closeAllPanels();
        }

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
    document.getElementById('panel-overlay').classList.remove('active');
}

function toggleFavorite(id) {
    const item = menuItems.find(m => m.id === id);
    const index = favorites.findIndex(fav => fav.id === id);

    if (index > -1) {
        favorites.splice(index, 1);
        showToast(`💔 Removed ${item.name} from Favorites`);
    } else {
        favorites.push(item);
        showToast(`❤️ Added ${item.name} to Favorites!`);
    }

    document.getElementById('favCount').innerText = favorites.length;
    renderFavoritesList();
    
    const currentTitle = document.getElementById('menu-title').innerText.toLowerCase();
    if (currentTitle.includes("coffee menu")) filterCategory('non-coffee');
    else if (currentTitle.includes("full menu")) filterCategory('all');
    else if (currentTitle.includes("coffee")) filterCategory('coffee');
    else if (currentTitle.includes("tea")) filterCategory('tea');
    else if (currentTitle.includes("desserts")) filterCategory('desserts');
}

function renderFavoritesList() {
    let output = "";
    if (favorites.length === 0) {
        output = `<p class="empty-message">No favorites added yet!</p>`;
    } else {
        favorites.forEach(item => {
            output += `
                <li class="panel-item-layout">
                    <img src="${item.image}" alt="${item.name}" class="panel-item-thumb" onclick="showProductDetails(${item.id})">
                    <div class="panel-item-details" onclick="showProductDetails(${item.id})" style="cursor:pointer;">
                        <strong>${item.name}</strong>
                        <span class="item-price-tag">₹${item.price}</span>
                    </div>
                    <span class="remove-item" onclick="toggleFavorite(${item.id})">&times;</span>
                </li>`;
        });
    }
    document.getElementById('fav-items').innerHTML = output;
}

function addToCartById(id) {
    if(isOrderPlaced) {
        isOrderPlaced = false;
    }

    const item = menuItems.find(m => m.id === id);
    const existingItem = cart.find(cartItem => cartItem.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 });
    }
    
    showToast(`🛒 Added ${item.name} to Cart!`);
    calculateTotal();
    renderCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    calculateTotal();
    renderCart();
}

function viewDetailsByCartId(id) {
    showProductDetails(id);
}

function removeCartItem(index) {
    const name = cart[index].name;
    cart.splice(index, 1);
    showToast(`🗑️ Removed ${name} from Cart`);
    calculateTotal();
    renderCart();
}

function calculateTotal() {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function processCheckout() {
    if(cart.length === 0) {
        showToast("⚠️ Your cart is empty. Add items before checking out!");
        return;
    }

    isOrderPlaced = true;
    const finalBillAmount = total;
    const purchasedItemsSnapshot = [...cart];

    let itemBreakdownHTML = "";
    purchasedItemsSnapshot.forEach(item => {
        itemBreakdownHTML += `
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #554138; margin-bottom: 6px; font-family: sans-serif; width: 100%; border-bottom: 1px dashed rgba(57, 24, 9, 0.1); padding-bottom: 4px;">
                <span>${item.name} <strong>x${item.quantity}</strong></span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
    });
    
    document.getElementById('cart-items').innerHTML = `
        <div class="order-success-container">
            <div class="success-icon">🎉</div>
            <h2>Order Placed Successfully!</h2>
            <p style="font-size: 13px; line-height: 1.4; color: #554138; margin-bottom: 15px;">
                Your items are flying straight into the brewer. Get ready for premium taste!
            </p>
            
            <div style="width: 100%; background: rgba(57, 24, 9, 0.04); padding: 12px; border-radius: 8px; margin-bottom: 10px; box-sizing: border-box;">
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; text-align: left; text-transform: uppercase; color: #391809;">Summary:</div>
                ${itemBreakdownHTML}
            </div>

            <div class="success-total-banner">Total Paid: ₹${finalBillAmount}</div>
        </div>
    `;
    
    document.getElementById('cart-footer-actions').style.display = 'none';
    
    cart = [];
    total = 0;
    document.getElementById('cartCount').innerText = "0";
    showToast("🚀 Order confirmed!");
}

function renderCart() {
    const actionsFooter = document.getElementById('cart-footer-actions');
    
    if (isOrderPlaced) {
        actionsFooter.style.display = 'none';
        return;
    }
    
    actionsFooter.style.display = 'block';
    let output = "";
    let itemsCount = 0;

    if (cart.length === 0) {
        output = `<p class="empty-message">Your cart is empty!</p>`;
    } else {
        cart.forEach((item, i) => {
            itemsCount += item.quantity;
            output += `
                <li class="panel-item-layout">
                    <img src="${item.image}" alt="${item.name}" class="panel-item-thumb" onclick="viewDetailsByCartId(${item.id})">
                    <div class="panel-item-details">
                        <strong onclick="viewDetailsByCartId(${item.id})" style="cursor:pointer;">${item.name}</strong>
                        <span class="item-price-tag">₹${item.price * item.quantity}</span>
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

    document.getElementById('cart-items').innerHTML = output;
    document.getElementById('cart-total').innerText = total;
    document.getElementById('cartCount').innerText = itemsCount;
}