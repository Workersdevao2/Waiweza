// ===== Products by category =====
const categories = [
  {
    id: 'colunas',
    title: 'Colunas Bluetooth',
    products: [
      { id: 'solar-l8mini', name: 'Coluna solar L8MINI', desc: 'Bluetooth, rádio FM e USB', price: 4500, priceLabel: '4.500 Kz', image: 'img/produtos/solar-l8mini.jpg' },
      { id: 'bluetooth-agua', name: 'Bluetooth à prova de água', desc: 'KBroad · IPX4 · RGB', price: 8500, priceLabel: '8.500 Kz', image: 'img/produtos/bluetooth-agua.jpg' },
      { id: 'bluetooth-boombest', name: 'Bluetooth BoomBest', desc: 'LN-1007BT wireless', price: 3500, priceLabel: '3.500 Kz', image: 'img/produtos/bluetooth-boombest.jpg' },
      { id: 'coluna-gts1360', name: 'Coluna portátil 3"', desc: 'Greatnice · FM, USB, SD', price: 7500, priceLabel: '7.500 Kz', image: 'img/produtos/coluna-gts1360.jpg' },
      { id: 'speaker-ac72', name: 'Speaker AC72', desc: 'Portátil com luz RGB', price: 6500, priceLabel: '6.500 Kz', image: 'img/produtos/speaker-ac72.jpg' },
      { id: 'speaker-ac73', name: 'Speaker AC73', desc: 'Bluetooth portátil', price: 7000, priceLabel: '7.000 Kz', image: 'img/produtos/speaker-ac73.jpg' },
      { id: 'speaker-lpv102', name: 'Speaker LP V102', desc: '8W · Good Bass · RGB', price: 7000, priceLabel: '7.000 Kz', image: 'img/produtos/speaker-lpv102.jpg' },
      { id: 'speaker-fabric-red', name: 'Coluna fabric RGB', desc: 'KBroad portátil', price: 3500, priceLabel: '3.500 Kz', image: 'img/produtos/speaker-fabric-red.jpg' },
      { id: 'speaker-purple', name: 'Coluna portátil 2"', desc: 'Greatnice · Bluetooth', price: 3000, priceLabel: '3.000 Kz', image: 'img/produtos/speaker-purple.jpg' },
      { id: 'coluna-microfone', name: 'Coluna com microfone', desc: 'Greatnice · portátil + microfone', price: 8000, priceLabel: '8.000 Kz', image: 'img/produtos/coluna-microfone.jpg' },
      { id: 'speaker-ac72-laranja', name: 'Speaker AC72 laranja', desc: 'Portátil com luz RGB', price: 6500, priceLabel: '6.500 Kz', image: 'img/produtos/speaker-ac72-laranja.jpg' }
    ]
  },
  {
    id: 'fones',
    title: 'Fones de Ouvido',
    products: [
      { id: 'fones-m90', name: 'Fones M90 Pro', desc: 'True wireless · ENC', price: 5000, priceLabel: '5.000 Kz', image: 'img/produtos/fones-m90.jpg' },
      { id: 'fones-pescoco', name: 'Fones de pescoço', desc: 'Neckband wireless KIN', price: 6000, priceLabel: '6.000 Kz', image: 'img/produtos/fones-pescoco.jpg' },
      { id: 'fones-p9', name: 'Headphones P9', desc: 'Over-ear wireless', price: 4500, priceLabel: '4.500 Kz', image: 'img/produtos/fones-p9.jpg' },
      { id: 'fones-yo8', name: 'Fones YO8', desc: 'On-ear wireless', price: 3500, priceLabel: '3.500 Kz', image: 'img/produtos/fones-yo8.jpg' },
      { id: 'fones-y60', name: 'Fones Y60', desc: 'True wireless headset', price: 5000, priceLabel: '5.000 Kz', image: 'img/produtos/fones-y60.jpg' }
    ]
  },
  {
    id: 'carregadores',
    title: 'Carregadores & Cabos',
    products: [
      { id: 'carregador-te', name: 'Carregador original', desc: 'TE-original · quick charge', price: 2500, priceLabel: '2.500 Kz', image: 'img/produtos/carregador-te.jpg' },
      { id: 'carregador-6a', name: 'Carregador 6A original', desc: 'TE-original · VOOC', price: 2500, priceLabel: '2.500 Kz', image: 'img/produtos/carregador-6a.jpg' },
      { id: 'carregador-azul', name: 'Carregador', desc: 'Com cabo', price: 1500, priceLabel: '1.500 Kz', image: 'img/produtos/carregador-azul.jpg' },
      { id: 'cabo-android', name: 'Cabo Android', desc: '2A fast charging', price: 1500, priceLabel: '1.500 Kz', image: 'img/produtos/cabo-verde.jpg' }
    ]
  },
  {
    id: 'outros',
    title: 'Capas, Películas & Outros',
    products: [
      { id: 'capa', name: 'Capa de telemóvel', desc: 'Vários modelos e cores', price: 2000, priceLabel: '2.000 Kz', image: 'img/produtos/capa-azul.jpg' },
      { id: 'pelicula', name: 'Película normal', desc: 'Protecção de ecrã', price: 1500, priceLabel: '1.500 Kz', image: 'img/visores.jpg' },
      { id: 'microfone-k35', name: 'Microfone wireless', desc: 'K35 Pro · lavalier', price: 4500, priceLabel: '4.500 Kz', image: 'img/produtos/microfone-k35.jpg' },
      { id: 'radio-golon', name: 'Rádio portátil', desc: 'Golon · FM/AM/SW · USB/TF', price: 9000, priceLabel: '9.000 Kz', image: 'img/produtos/radio-golon.jpg' }
    ]
  }
];

// Flat list for cart lookup
const products = categories.flatMap(c => c.products);

// ===== Cart state =====
let cart = JSON.parse(localStorage.getItem('waiweza_cart') || '[]');

function saveCart() {
  localStorage.setItem('waiweza_cart', JSON.stringify(cart));
  updateCartUI();
}

function formatPrice(n) {
  return n.toLocaleString('pt-AO') + ' Kz';
}

function productCardHTML(p) {
  return `
    <article class="product-card">
      <div class="product-img" style="background-image: url('${p.image}');"></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <p class="product-price">${p.priceLabel}</p>
        <button class="btn btn-add" data-id="${p.id}">Adicionar</button>
      </div>
    </article>
  `;
}

// ===== Render category carousels =====
function renderProducts() {
  const root = document.getElementById('productsGrid');
  if (!root) return;

  root.className = 'products-carousels';
  root.innerHTML = categories.map(cat => `
    <div class="product-row" data-category="${cat.id}">
      <div class="product-row-header">
        <h3 class="product-row-title">${cat.title}</h3>
        <div class="product-row-nav">
          <button type="button" class="carousel-btn carousel-prev" aria-label="Anterior">‹</button>
          <button type="button" class="carousel-btn carousel-next" aria-label="Seguinte">›</button>
        </div>
      </div>
      <div class="carousel-track" tabindex="0">
        ${cat.products.map(productCardHTML).join('')}
      </div>
    </div>
  `).join('');

  root.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });

  root.querySelectorAll('.product-row').forEach(row => {
    const track = row.querySelector('.carousel-track');
    const prev = row.querySelector('.carousel-prev');
    const next = row.querySelector('.carousel-next');
    const scrollBy = () => Math.max(track.clientWidth * 0.85, 200);

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollBy(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      track.scrollBy({ left: scrollBy(), behavior: 'smooth' });
    });
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  if (countEl) {
    countEl.textContent = totalQty;
    countEl.style.display = totalQty > 0 ? 'flex' : 'none';
  }

  if (itemsEl) {
    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Carrinho vazio</p>';
    } else {
      itemsEl.innerHTML = cart.map(i => `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4>${i.name}</h4>
            <p>${formatPrice(i.price)} × ${i.qty}</p>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" data-id="${i.id}" data-delta="-1">−</button>
            <span class="qty-num">${i.qty}</span>
            <button class="qty-btn" data-id="${i.id}" data-delta="1">+</button>
          </div>
        </div>
      `).join('');

      itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          changeQty(btn.dataset.id, parseInt(btn.dataset.delta, 10));
        });
      });
    }
  }

  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

function openCart() {
  document.getElementById('cartPanel')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
}

function closeCart() {
  document.getElementById('cartPanel')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
}

function checkout() {
  if (cart.length === 0) {
    alert('O carrinho está vazio.');
    return;
  }

  let message = 'Olá! Quero fazer o seguinte pedido:%0A%0A';
  cart.forEach(i => {
    message += `• ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}%0A`;
  });
  message += `%0A*Total: ${formatPrice(getCartTotal())}*`;

  const url = `https://wa.me/244932746855?text=${message}`;
  window.open(url, '_blank');
}

function initMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initMenu();

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
});
