// ===== Products data =====
const products = [
  {
    id: 'visor',
    name: 'Visor / Ecrã',
    desc: 'Todos os tipos — a partir de',
    price: 10000,
    priceLabel: 'A partir de 10.000 Kz',
    image: 'img/visores.jpg'
  },
  {
    id: 'carregador-normal',
    name: 'Carregador normal',
    desc: 'Android, Tipo-C, iPhone, bico fino',
    price: 1000,
    priceLabel: '1.000 Kz',
    image: 'img/acessorios.jpg'
  },
  {
    id: 'carregador-original',
    name: 'Carregador original',
    desc: 'Melhor qualidade',
    price: 2500,
    priceLabel: '2.500 Kz',
    image: 'img/acessorios.jpg'
  },
  {
    id: 'auriculares',
    name: 'Auriculares sem fio',
    desc: 'Boa qualidade',
    price: 4500,
    priceLabel: '4.500 Kz',
    image: 'img/acessorios.jpg'
  },
  {
    id: 'capa',
    name: 'Capa de telemóvel',
    desc: 'Vários modelos e cores',
    price: 1500,
    priceLabel: '1.500 Kz',
    image: 'img/loja.jpg'
  },
  {
    id: 'bluetooth',
    name: 'Bluetooth / Coluna',
    desc: 'Várias referências',
    price: 4500,
    priceLabel: '4.500 – 8.000 Kz',
    image: 'img/acessorios.jpg'
  },
  {
    id: 'bluetooth-agua',
    name: 'Bluetooth à prova de água',
    desc: 'KBroad · IPX4 · RGB',
    price: 8500,
    priceLabel: '8.500 Kz',
    image: 'img/bluetooth-agua.jpg'
  },
  {
    id: 'pelicula',
    name: 'Película (tempered glass)',
    desc: 'Protecção de ecrã',
    price: 1000,
    priceLabel: '1.000 Kz',
    image: 'img/visores.jpg'
  },
  {
    id: 'microfone-tiktok',
    name: 'Microfone TikTok',
    desc: 'Lavalier wireless K35 Pro',
    price: 4500,
    priceLabel: '4.500 Kz',
    image: 'img/microfone.jpg'
  }
];

// ===== Cart state =====
let cart = JSON.parse(localStorage.getItem('waiweza_cart') || '[]');

function saveCart() {
  localStorage.setItem('waiweza_cart', JSON.stringify(cart));
  updateCartUI();
}

function formatPrice(n) {
  return n.toLocaleString('pt-AO') + ' Kz';
}

// ===== Render products =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-img" style="background-image: url('${p.image}');"></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <p class="product-price">${p.priceLabel}</p>
        <button class="btn btn-add" data-id="${p.id}">Adicionar</button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

// ===== Cart functions =====
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
  if (countEl) countEl.textContent = totalQty;

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

// ===== Menu =====
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

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  initMenu();

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
});
