// Simulación de Carrito de Compras
// Poner/quitar objetos, etc.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let cart = []; // Carrito vacío

let products = [
  { id: 1, name: 'Manzana', price: 2 },
  { id: 2, name: 'Pan', price: 3 },
  { id: 3, name: 'Leche', price: 4 },
  { id: 4, name: 'Huevos', price: 5 },
];

function displayMenu() {
  console.log('\n--- Carrito de compras ---');
  console.log('1. Mostrar productos');
  console.log('2. Agregar producto');
  console.log('3. Quitar producto');
  console.log('4. Ver carrito');
  console.log('5. Total');
  console.log('6. Salir');
}

function viewProducts() {
  console.log('\nProductos disponibles:');
  products.forEach(product => {
    console.log(`ID: ${product.id}, Nombre: ${product.name}, Precio: $${product.price}`);
  });
}

function addToCart() {
  viewProducts();
  rl.question('Escribe el ID del producto: ', (input) => {
    const productId = parseInt(input);
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push(product);
      console.log(`${product.name} agregado al carrito.`);
    } else {
      console.log('Producto no encontrado.');
    }
    main();
  });
}

function removeFromCart() {
  if (cart.length === 0) {
    console.log('El carrito está vacío.');
    main();
    return;
  }
  console.log('\nCarrito actual:');
  cart.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price}`);
  });
  rl.question('Escribe el número del producto: ', (input) => {
    const index = parseInt(input) - 1;
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1);
      console.log(`${removed[0].name} quitado del carrito.`);
    } else {
      console.log('Índice no válido.');
    }
    main();
  });
}

function viewCart() {
  if (cart.length === 0) {
    console.log('El carrito está vacío.');
  } else {
    console.log('\nCarrito:');
    cart.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price}`);
    });
  }
}

function calculateTotal() {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  console.log(`Total a pagar: $${total}`);
}

function main() {
  displayMenu();
  rl.question('Elige una opción: ', (choice) => {
    if (choice === '1') {
      viewProducts();
      main();
    } else if (choice === '2') {
      addToCart();
    } else if (choice === '3') {
      removeFromCart();
    } else if (choice === '4') {
      viewCart();
      main();
    } else if (choice === '5') {
      calculateTotal();
      main();
    } else if (choice === '6') {
      console.log('Gracias.');
      rl.close();
    } else {
      console.log('Opción no válida.');
      main();
    }
  });
}

main();