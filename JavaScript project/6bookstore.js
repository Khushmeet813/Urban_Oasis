const books = [
  { id: 'b1', title: 'The Midnight Library', author: 'Matt Haig', price: 349, origPrice: 499, rentPrice: 49, genre: 'Fiction', img: 'Images/the_midnight_library.jpeg', discount: '30% OFF', freebie: true },
  { id: 'b2', title: 'Atomic Habits', author: 'James Clear', price: 399, origPrice: 549, rentPrice: 59, genre: 'Non-Fiction', img: 'Images/atomic_habits.jpeg', discount: '27% OFF', freebie: true },
  { id: 'b3', title: 'The Silent Patient', author: 'Alex Michaelides', price: 299, origPrice: 399, rentPrice: 39, genre: 'Mystery', img: 'Images/the_silent_patient.jpeg', discount: '25% OFF', freebie: true },
  { id: 'b4', title: 'It Ends with Us', author: 'Colleen Hoover', price: 349, origPrice: 499, rentPrice: 49, genre: 'Romance', img: 'Images/it_ends_with_us.jpeg', discount: '30% OFF', freebie: true },
  { id: 'b5', title: 'Cosmos', author: 'Carl Sagan', price: 449, origPrice: 599, rentPrice: 69, genre: 'Science', img: 'Images/cosmos.jpeg', discount: '25% OFF', freebie: true },
  { id: 'b6', title: "Harry Potter & the Sorcerer's Stone", author: 'J.K. Rowling', price: 499, origPrice: 699, rentPrice: 79, genre: 'Fiction', img: 'Images/harry_potter_and_the_sorce.jpeg', discount: '28% OFF', freebie: true },
  { id: 'b7', title: 'Sapiens', author: 'Yuval Noah Harari', price: 429, origPrice: 599, rentPrice: 65, genre: 'Non-Fiction', img: 'Images/sapeins.jpeg', discount: '28% OFF', freebie: true },
  { id: 'b8', title: 'The Alchemist', author: 'Paulo Coelho', price: 279, origPrice: 399, rentPrice: 39, genre: 'Fiction', img: 'Images/the_alchemist.jpeg', discount: '30% OFF', freebie: true }
];

const reviews = [
  { name: 'Rohit S.', text: 'Rented 3 books and got a free café drink. The bookmark freebie is so cute!', stars: 5, emoji: '📚', date: '2 weeks ago' },
  { name: 'Ananya P.', text: 'The old book smell and warm lighting makes reading here magical. Best library in Amritsar!', stars: 5, emoji: '🕯️', date: '1 month ago' },
  { name: 'Vikram M.', text: 'Great collection of books. The rent option is a lifesaver for students like me.', stars: 4, emoji: '🎓', date: '3 weeks ago' },
  { name: 'Neha K.', text: 'I found some rare editions here. The staff is super helpful and knowledgeable.', stars: 5, emoji: '📖', date: '1 week ago' }
];

const faqs = [
  { q: 'How does book renting work?', a: 'Rent any book for 7 or 14 days. Pay a fraction of the book price. Return in original condition. Renew online if you need more time!' },
  { q: 'Can I order books online and pick up in store?', a: 'Yes! Click "Online Mode", add to cart and choose "In-Store Pickup" at checkout. Ready within 2 hours.' },
  { q: 'What are the freebies with each purchase?', a: 'Every purchase gets a handcrafted bookmark. Orders above ₹299 get a Reading Notes pad. Orders above ₹599 get a scented candle. 3+ books get a free café drink!' },
  { q: 'Do you buy second-hand books?', a: 'Yes! Bring your old books in-store and we give you store credit based on condition.' }
];

let cart = [];
let wishlist = [];
let activeGenre = 'All';

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
  showToast(`📚 ${item.title} added to cart!`, 'success');
}

function addToWish(item) {
  if (wishlist.find(i => i.id === item.id)) {
    showToast('❤️ Already in wishlist!', '');
    return;
  }
  wishlist.push(item);
  updateBadges();
  renderWishDrawer();
  showToast(`🤍 ${item.title} added to wishlist`, 'success');
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
        <img src="${item.img || 'https://placehold.co/50x65?text=📖'}" class="cart-item-img" onerror="this.src='https://placehold.co/50x65?text=📖'">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.title || item.name}</div>
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
      <img src="${item.img || 'https://placehold.co/50x65?text=📖'}" class="cart-item-img" onerror="this.src='https://placehold.co/50x65?text=📖'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.title || item.name}</div>
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
    addToCart({ id: item.id, title: item.title, price: item.price, img: item.img });
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

function filterBooks() {
  const searchTerm = document.getElementById('lib-search').value.toLowerCase();
  const genreFilter = document.getElementById('lib-genre').value;
  const sortBy = document.getElementById('lib-sort').value;

  let filtered = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    const matchesGenre = (activeGenre === 'All' || book.genre === activeGenre) && (!genreFilter || book.genre === genreFilter);
    return matchesSearch && matchesGenre;
  });

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

  renderBooks(filtered);
}

function setGenre(btn, genre) {
  document.querySelectorAll('.genre-tab').forEach(tab => tab.classList.remove('active'));
  btn.classList.add('active');
  activeGenre = genre;
  filterBooks();
}

function renderBooks(bookList) {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  if (bookList.length === 0) {
    grid.innerHTML = '<div style="text-align:center; padding:3rem; color:#b89a7a;">📖 No books found. Try a different search!</div>';
    return;
  }

  grid.innerHTML = bookList.map(book => `
    <div class="book-card">
      <div class="book-cover">
        <div class="badge-container">
          <span class="book-discount-badge">${book.discount}</span>
          ${book.freebie ? '<span class="book-freebie-badge">🎁 Freebie</span>' : ''}
        </div>
        <img src="${book.img}" alt="${book.title}" class="book-cover-img" onerror="this.src='https://placehold.co/120x160?text=📖'">
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        <div class="book-price-row">
          <span class="book-price">₹${book.price}</span>
          <span class="book-price-orig">₹${book.origPrice}</span>
        </div>
        <div class="book-rent-price">📖 Rent from ₹${book.rentPrice}/week</div>
        <div class="book-actions">
          <button class="btn-cart" onclick="addToCart({id:'${book.id}', title:'${book.title.replace(/'/g, "\\'")}', price:${book.price}, img:'${book.img}'})">Add to Cart</button>
          <button class="btn-rent" onclick="addToCart({id:'${book.id}-rent', title:'${book.title.replace(/'/g, "\\'")} (Rent)', price:${book.rentPrice}, img:'${book.img}'})">Rent</button>
          <button class="btn-wish" onclick="addToWish({id:'${book.id}', title:'${book.title.replace(/'/g, "\\'")}', price:${book.price}, img:'${book.img}'})">🤍</button>
        </div>
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
    <div class="faq-item" id="faq-${index}">
      <button class="faq-q" onclick="toggleFaq('faq-${index}')">
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

renderBooks(books);
renderReviews();
renderFaqs();
updateBadges();