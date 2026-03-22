// Simulación de Cajero Automático
// Retiro, consignación, consultar saldo, transferir

const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
  output: process.stdout
});

let balance = 1000; // Saldo inicial
let otherAccount = 500; // Otra cuenta para transferencias

function displayMenu() {
  console.log('\n--- Cajero Automático ---');
  console.log('1. Consultar saldo');
  console.log('2. Retiro');
  console.log('3. Consignación');
  console.log('4. Transferir');
  console.log('5. Salir');
}

function checkBalance() {
  console.log(`Su saldo actual es: $${balance}`);
}

function withdraw() {
  rl.question('Escribe el monto a retirar: ', (input) => {
    const amount = parseFloat(input);
    if (amount > 0 && amount <= balance) {
      balance -= amount;
      console.log(`Retiro exitoso. Nuevo saldo: $${balance}`);
    } else {
      console.log('Monto inválido o insuficiente.');
    }
    main();
  });
}

function deposit() {
  rl.question('Escribe el monto a consignar: ', (input) => {
    const amount = parseFloat(input);
    if (amount > 0) {
      balance += amount;
      console.log(`Consignación exitosa. Nuevo saldo: $${balance}`);
    } else {
      console.log('Monto inválido.');
    }
    main();
  });
}

function transfer() {
  rl.question('Escribe el monto a transferir: ', (input) => {
    const amount = parseFloat(input);
    if (amount > 0 && amount <= balance) {
      balance -= amount;
      otherAccount += amount;
      console.log(`Transferencia exitosa. Nuevo saldo: $${balance}`);
    } else {
      console.log('Monto inválido o insuficiente.');
    }
    main();
  });
}

function main() {
  displayMenu();
  rl.question('Elige una opción: ', (choice) => {
    if (choice === '1') {
      checkBalance();
      main();
    } else if (choice === '2') {
      withdraw();
    } else if (choice === '3') {
      deposit();
    } else if (choice === '4') {
      transfer();
    } else if (choice === '5') {
      console.log('Gracias.');
      rl.close();
    } else {
      console.log('Opción no válida.');
      main();
    }
  });
}

main();