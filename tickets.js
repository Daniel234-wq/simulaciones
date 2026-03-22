// Venta de boletas
// Usar .filter(), .map() y .find()

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let seats = [
  { id: 1, section: 'A', available: true, price: 20 },
  { id: 2, section: 'A', available: true, price: 20 },
  { id: 3, section: 'B', available: false, price: 30 },
  { id: 4, section: 'B', available: true, price: 30 },
  { id: 5, section: 'C', available: true, price: 40 },
];

function displayMenu() {
  console.log('\n--- Venta de boletas ---');
  console.log('1. Mostrar asientos libres');
  console.log('2. Comprar asiento');
  console.log('3. Salir');
}

function viewAvailableSeats() {
  // filtrar asientos libres
  const available = seats.filter(seat => seat.available);
  if (available.length > 0) {
    console.log('\nAsientos libres:');
    // crear texto con map y mostrarlo
    available
      .map(seat => `ID: ${seat.id}, Sección: ${seat.section}, Precio: $${seat.price}`)
      .forEach(line => console.log(line));
  } else {
    console.log('No hay asientos libres.');
  }
}

function buyTicket() {
  viewAvailableSeats();
  rl.question('Escribe el ID del asiento: ', (input) => {
    const seatId = Number(input);
    // buscar asiento disponible
    const seat = seats.find(s => s.id === seatId && s.available);
    if (seat) {
      seat.available = false;
      console.log(`Asiento ${seatId} comprado.`);
    } else {
      console.log('No existe el asiento o ya no está disponible.');
    }
    main();
  });
}

function main() {
  displayMenu();
  rl.question('Elige una opción: ', (choice) => {
    if (choice === '1') {
      viewAvailableSeats();
      main();
    } else if (choice === '2') {
      buyTicket();
    } else if (choice === '3') {
      console.log('Gracias.');
      rl.close();
    } else {
      console.log('Opción no válida.');
      main();
    }
  });
}

main();