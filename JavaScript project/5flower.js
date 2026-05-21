const flowers = [
      { id: 'f1', name: 'Red Rose Bouquet', price: 699, desc: '12 premium red roses with baby\'s breath', img: 'Images/red_rose.jpeg', discount: '10% OFF' },
      { id: 'f2', name: 'Sunflower Sunshine', price: 549, desc: '8 bright sunflowers with eucalyptus', img: 'Images/sunflower.jpeg', discount: '15% OFF' },
      { id: 'f3', name: 'Pink Paradise', price: 799, desc: 'Mixed pink carnations, lilies & orchids', img: 'Images/pink_lilies.jpeg', discount: '20% OFF' },
      { id: 'f4', name: 'Lavender Dream', price: 649, desc: 'Fresh lavender bundles with white daisies', img: 'Images/daisies.jpeg', discount: '10% OFF' },
      { id: 'f5', name: 'Tropical Burst', price: 899, desc: 'Exotic anthuriums & birds of paradise', img: 'Images/birds_of_paradise.jpeg', discount: '15% OFF' },
      { id: 'f6', name: 'White Elegance', price: 1199, desc: 'Premium white lilies & orchid arrangement', img: 'Images/white_lilies.jpeg', discount: '20% OFF' },
      { id: 'f7', name: 'Rainbow Wildflower', price: 599, desc: 'Seasonal wildflowers in vibrant mix', img: 'Images/wildflowers.jpeg', discount: '10% OFF' },
      { id: 'f8', name: 'Tulip Garden', price: 749, desc: 'Dutch tulips in spring pastels', img: 'Images/tulip.jpeg', discount: '15% OFF' }
    ];

    const reviews = [
      { name: 'Deepika A.', text: 'Ordered birthday flowers for my best friend. The presentation was stunning!', stars: 5, emoji: '🌸', date: '2 weeks ago' },
      { name: 'Rajan S.', text: 'The gifting link feature is so innovative. My girlfriend loved it!', stars: 5, emoji: '💝', date: '1 month ago' },
      { name: 'Priya M.', text: 'Fresh, fragrant, and delivered right on time. Will order again!', stars: 5, emoji: '🌹', date: '3 weeks ago' },
      { name: 'Amit K.', text: 'The lavender bouquet helped my wife relax after a long week. Thank you!', stars: 5, emoji: '💜', date: '1 week ago' }
    ];

    const faqs = [
      { q: 'How do I send flowers via link?', a: 'Click "Send a Gift", fill in recipient details and add a personal note. We generate a shareable link. Your recipient uses it to confirm the address and preferred delivery time.' },
      { q: 'How fresh are your flowers?', a: 'All flowers are sourced fresh every morning from local and imported farms. Guaranteed freshness for 5–7 days with our care instructions.' },
      { q: 'Do you do wedding/event decor?', a: 'Yes! We take bulk orders and event decoration bookings. Contact our events team for packages.' },
      { q: 'Can I customize a bouquet?', a: 'Of course! Visit in-store or WhatsApp us to build a custom arrangement.' },
      { q: 'Do you offer same-day delivery?', a: 'Yes! Orders placed before 2 PM are delivered same-day within city limits.' }
    ];

    let cart = [];
    let wishlist = [];
    let currentMode = 'online';

    function showToast(message, type = '') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = message;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    function updateBadges() {
      const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      document.getElementById('cart-badge').textContent = cartCount;
      document.getElementById('wish-badge').textContent = wishlist.length;
    }

    function addToCart(item) {
      const existing = cart.find(i => i.id === item.id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({ ...item, qty: 1 });
      }
      updateBadges();
      renderCartDrawer();
      showToast(`🌸 ${item.name} added to cart!`, 'success');
    }

    function addToWish(item) {
      if (wishlist.find(i => i.id === item.id)) {
        showToast('💗 Already in wishlist!', '');
        return;
      }
      wishlist.push(item);
      updateBadges();
      renderWishDrawer();
      showToast(`🤍 ${item.name} added to wishlist`, 'success');
    }

    function removeFromCart(id) {
      cart = cart.filter(i => i.id !== id);
      updateBadges();
      renderCartDrawer();
      showToast('Item removed from cart', '');
    }

    function removeFromWish(id) {
      wishlist = wishlist.filter(i => i.id !== id);
      updateBadges();
      renderWishDrawer();
      showToast('Item removed from wishlist', '');
    }

    function renderCartDrawer() {
      const body = document.getElementById('cart-body');
      if (!cart.length) {
        body.innerHTML = '<div class="empty-state">🛒 Your cart is empty</div>';
        document.getElementById('cart-total-amt').textContent = '₹0';
        return;
      }
      let total = 0;
      body.innerHTML = cart.map(item => {
        const itemTotal = (item.price || 0) * (item.qty || 1);
        total += itemTotal;
        return `
          <div class="cart-item">
            <img src="${item.img || 'https://placehold.co/50x50?text=🌸'}" class="cart-item-img" onerror="this.src='https://placehold.co/50x50?text=🌸'">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">₹${item.price} × ${item.qty || 1} = ₹${itemTotal}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
          </div>
        `;
      }).join('');
      document.getElementById('cart-total-amt').textContent = `₹${total}`;
    }

    function renderWishDrawer() {
      const body = document.getElementById('wish-body');
      if (!wishlist.length) {
        body.innerHTML = '<div class="empty-state">🤍 Your wishlist is empty</div>';
        return;
      }
      body.innerHTML = wishlist.map(item => `
        <div class="cart-item">
          <img src="${item.img || 'https://placehold.co/50x50?text=🌸'}" class="cart-item-img" onerror="this.src='https://placehold.co/50x50?text=🌸'">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromWish('${item.id}')">✕</button>
        </div>
      `).join('');
    }

    function toggleCartDrawer() {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-overlay');
      drawer.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    }

    function toggleWishlistDrawer() {
      const drawer = document.getElementById('wishlist-drawer');
      const overlay = document.getElementById('wish-overlay');
      drawer.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    }

    function toggleCart() {
      toggleCartDrawer();
    }

    function toggleWishlist() {
      toggleWishlistDrawer();
    }

    function moveAllToCart() {
      wishlist.forEach(item => {
        addToCart({ id: item.id, name: item.name, price: item.price, img: item.img });
      });
      wishlist = [];
      updateBadges();
      renderWishDrawer();
      showToast('✨ All wishlist items moved to cart!', 'success');
    }

    function checkout() {
      if (cart.length === 0) {
        showToast('🛒 Your cart is empty', '');
        return;
      }
      showToast('🎉 Proceeding to checkout! (Demo mode)', 'success');
      toggleCartDrawer();
    }

    function setMode(mode, btn) {
      currentMode = mode;
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const offlineMsg = document.getElementById('offline-msg');
      const giftBanner = document.getElementById('gift-banner');
      if (mode === 'offline') {
        offlineMsg.style.display = 'block';
        if (giftBanner) giftBanner.style.display = 'none';
        showToast('📍 Visit us at 12 Reading Lane, Amritsar!', '');
      } else {
        offlineMsg.style.display = 'none';
        if (giftBanner) giftBanner.style.display = 'flex';
      }
    }

    function renderFlowers() {
      const grid = document.getElementById('flowers-grid');
      if (!grid) return;

      grid.innerHTML = flowers.map(flower => `
        <div class="flower-card">
          <div class="flower-card-img">
            <span class="discount-badge">${flower.discount}</span>
            <img src="${flower.img}" alt="${flower.name}" class="flower-product-img" onerror="this.src='https://placehold.co/130x130?text=🌸'">
          </div>
          <div class="flower-card-info">
            <div class="flower-card-name">${flower.name}</div>
            <div class="flower-card-desc">${flower.desc}</div>
            <div class="flower-price">₹${flower.price}</div>
            <div class="flower-actions">
              <button class="btn-add-flower" onclick="addToCart({id:'${flower.id}', name:'${flower.name.replace(/'/g, "\\'")}', price:${flower.price}, img:'${flower.img}'})">Add to Cart 🛒</button>
              <button class="btn-wish-flower" onclick="addToWish({id:'${flower.id}', name:'${flower.name.replace(/'/g, "\\'")}', price:${flower.price}, img:'${flower.img}'})">🤍</button>
            </div>
            <button class="send-link-btn" onclick="openGiftModal()">💌 Send as Gift</button>
          </div>
        </div>
      `).join('');
    }

    function renderReviews() {
      const grid = document.getElementById('reviews-grid');
      if (!grid) return;
      
      grid.innerHTML = reviews.map(review => `
        <div class="review-card">
          <div class="review-stars">${'★'.repeat(review.stars)}</div>
          <p class="review-text">"${review.text}"</p>
          <div class="review-author">
            <div class="review-avatar">${review.emoji}</div>
            <div>
              <div class="review-name">${review.name}</div>
              <div class="review-date">${review.date}</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    function renderFaqs() {
      const container = document.getElementById('faq-container');
      if (!container) return;
      
      container.innerHTML = faqs.map((faq, index) => `
        <div class="faq-item" id="flower-faq-${index}">
          <button class="faq-q" onclick="toggleFaq('flower-faq-${index}')">
            ${faq.q} <span class="arrow">▾</span>
          </button>
          <div class="faq-a">
            <div class="faq-a-inner">${faq.a}</div>
          </div>
        </div>
      `).join('');
    }

    function toggleFaq(id) {
      const element = document.getElementById(id);
      element.classList.toggle('open');
    }

    function openGiftModal() {
      document.getElementById('gift-modal').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(id) {
      document.getElementById(id).classList.remove('open');
      document.body.style.overflow = '';
    }

    function generateGiftLink() {
      const name = document.getElementById('gift-name').value;
      if (!name) {
        showToast('Please enter recipient name', '');
        return;
      }
      document.getElementById('gift-link-result').style.display = 'block';
      showToast('Gift link generated! 💝', 'success');
    }

    function copyGiftLink() {
      navigator.clipboard.writeText('https://urbanoasis.in/gift/flower123');
      showToast('Link copied to clipboard!', 'success');
    }

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', function(e) {
        if (e.target === this) closeModal(this.id);
      });
    });

    renderFlowers();
    renderReviews();
    renderFaqs();
    updateBadges();