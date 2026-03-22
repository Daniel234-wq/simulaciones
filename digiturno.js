// Simulación de Digiturno
// Cuantos están en la fila, asignación de turno, cliente atendido

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let queue = []; // Cola de turnos
let turnNumber = 1; // Número de turno actual

function displayMenu() {
  console.log('\n--- Digiturno ---');
  console.log('1. Ver fila');
  console.log('2. Dar turno');
  console.log('3. Atender');
  console.log('4. Salir');
}

function viewQueueLength() {
  console.log(`Personas en fila: ${queue.length}`);
}

function assignTurn() {
  queue.push(turnNumber);
  console.log(`Turno asignado: ${turnNumber}`);
  turnNumber++;
}

function attendClient() {
  if (queue.length > 0) {
    const attended = queue.shift();
    console.log(`Cliente con turno ${attended} atendido.`);
  } else {
    console.log('No hay clientes en fila.');
  }
}

function main() {
  displayMenu();
  rl.question('Elige una opción: ', (choice) => {
    if (choice === '1') {
      viewQueueLength();
      main();
    } else if (choice === '2') {
      assignTurn();
      main();
    } else if (choice === '3') {
      attendClient();
      main();
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