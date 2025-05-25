// Lista de produtos
// ============================
// Dados dos produtos
// ============================
const products = [
  {
    id: 1,
    name: "Maçã",
    price: 2.5,
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=228&h=188&fit=crop",
  },
  {
    id: 2,
    name: "Banana",
    price: 1.8,
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=228&h=188&fit=crop",
  },
  {
    id: 3,
    name: "Pão Francês",
    price: 0.9,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=228&h=188&fit=crop",
  },
  {
    id: 4,
    name: "Leite",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=228&h=188&fit=crop",
  },
  {
    id: 5,
    name: "Ovos (12un)",
    price: 9.0,
    image:
      "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=228&h=188&fit=crop",
  },
  {
    id: 6,
    name: "Arroz 5kg",
    price: 19.9,
    image:
      "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=228&h=188&fit=crop",
  },
  {
    id: 7,
    name: "Feijão 1kg",
    price: 8.5,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=228&h=188&fit=crop",
  },
  {
    id: 8,
    name: "Cenoura",
    price: 3.2,
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=228&h=188&fit=crop",
  },
  {
    id: 9,
    name: "Batata",
    price: 4.0,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=228&h=188&fit=crop",
  },
  {
    id: 10,
    name: "Tomate",
    price: 5.5,
    image:
      "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=228&h=188&fit=crop",
  },
];

// ============================
// Carrinho (LocalStorage)
// ============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================
// Funções Utilitárias
// ============================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

// ============================
// Adicionar ao Carrinho
// ============================
function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  const product = getProductById(productId);
  alert(`${product.name} foi adicionado ao carrinho!`);
}

// ============================
// Renderizar Produtos (index.html)
// ============================
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${
              product.id
            })">Adicionar ao Carrinho</button>
        `;
    productList.appendChild(div);
  });
}

// ============================
// Renderizar Carrinho (cart.html)
// ============================
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item) => {
    const product = getProductById(item.id);
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <h4>${product.name}</h4>
            <p>Preço: R$ ${product.price.toFixed(2)}</p>
            <p>Quantidade: 
                <button onclick="changeQuantity(${item.id}, -1)">-</button> 
                ${item.quantity} 
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </p>
            <p>Subtotal: R$ ${itemTotal.toFixed(2)}</p>
            <button onclick="removeItem(${item.id})">Remover</button>
            <hr>
        `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);
}

// ============================
// Funções do Carrinho
// ============================
function changeQuantity(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }
  saveCart();
  renderCart();
  updateCartCount();
}

function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
  updateCartCount();
}

// ============================
// Checkout Simples
// ============================
function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
}

// ============================
// Inicialização
// ============================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  updateCartCount();
});
// ============================
// Checkout
// ============================
function renderCheckout() {
  const summary = document.getElementById("order-summary");
  const totalElement = document.getElementById("order-total");
  if (!summary) return;

  summary.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    summary.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalElement.textContent = "0.00";
    return;
  }

  cart.forEach((item) => {
    const product = getProductById(item.id);
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.innerHTML = `
            <p>${product.name} x ${item.quantity} - R$ ${itemTotal.toFixed(
      2
    )}</p>
        `;
    summary.appendChild(div);
  });

  totalElement.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    renderCheckout();

    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("checkout-name").value;
      const address = document.getElementById("checkout-address").value;
      const payment = document.getElementById("checkout-payment").value;

      if (!name || !address || !payment) {
        alert("Preencha todos os campos!");
        return;
      }

      alert(
        `Pedido confirmado! Obrigado, ${name}!\nO pagamento será via ${payment.toUpperCase()}.`
      );

      cart = [];
      saveCart();
      updateCartCount();
      window.location.href = "index.html";
    });
  }
});
