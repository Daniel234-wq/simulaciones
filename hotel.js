// Simulación de Sistema de Reserva de Hotel
// Usando filter, map, reduce y menú

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let rooms = [
  { id: 1, type: 'single', available: true, price: 50 },
  { id: 2, type: 'double', available: true, price: 80 },
  { id: 3, type: 'suite', available: false, price: 150 },
  { id: 4, type: 'single', available: true, price: 50 },
  { id: 5, type: 'double', available: true, price: 80 },
];

function displayMenu() {
  console.log('\n--- Reserva de hotel ---');
  console.log('1. Mostrar habitaciones libres');
  console.log('2. Reservar habitación');
  console.log('3. Cancelar reserva');
  console.log('4. Salir');
}

function viewAvailableRooms() {
  const available = rooms.filter(room => room.available);
  if (available.length > 0) {
    console.log('\nHabitaciones disponibles:');
    available.forEach(room => {
      console.log(`ID: ${room.id}, Tipo: ${room.type}, Precio: $${room.price}`);
    });
  } else {
    console.log('No hay habitaciones disponibles.');
  }
}

function countAvailableRooms() {
  const count = rooms.reduce((acc, room) => acc + (room.available ? 1 : 0), 0);
  console.log(`Total de habitaciones disponibles: ${count}`);
}

function bookRoom() {
  viewAvailableRooms();
  rl.question('Escribe el ID de la habitación: ', (input) => {
    const roomId = parseInt(input);
    const room = rooms.find(r => r.id === roomId && r.available);
    if (room) {
      room.available = false;
      console.log(`Habitación ${roomId} reservada.`);
    } else {
      console.log('No disponible o ID inválido.');
    }
    main();
  });
}

function cancelBooking() {
  const booked = rooms.filter(room => !room.available);
  if (booked.length > 0) {
    console.log('\nHabitaciones reservadas:');
    booked.forEach(room => {
      console.log(`ID: ${room.id}, Tipo: ${room.type}`);
    });
    rl.question('Escribe el ID de la habitación: ', (input) => {
      const roomId = parseInt(input);
      const room = rooms.find(r => r.id === roomId && !r.available);
      if (room) {
        room.available = true;
        console.log(`Reserva ${roomId} cancelada.`);
      } else {
        console.log('No reservada o ID inválido.');
      }
      main();
    });
  } else {
    console.log('No hay reservas para cancelar.');
    main();
  }
}

function main() {
  displayMenu();
  rl.question('Elige una opción: ', (choice) => {
    if (choice === '1') {
      viewAvailableRooms();
      countAvailableRooms();
      main();
    } else if (choice === '2') {
      bookRoom();
    } else if (choice === '3') {
      cancelBooking();
    } else if (choice === '4') {
      console.log('Gracias.');
      rl.close();
    } else {
      console.log('Opción no válida.');
      main();
    }
  });
}

main();