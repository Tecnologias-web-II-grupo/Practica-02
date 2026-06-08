// Genera un numero aleatorio entre min y max inclusive
export function tirarDado() {
  return Math.floor(Math.random() * 6) + 1
}

// Recibe cuantos dados y devuelve un array con los valores y la suma
export function lanzarDados(cantidad) {
  const valores = []
  for (let i = 0; i < cantidad; i++) {
    valores.push(tirarDado())
  }
  const suma = valores.reduce((a, b) => a + b, 0)
  return { valores, suma }
}

// Calcula la edad a partir de una fecha string "YYYY-MM-DD"
export function calcularEdad(fechaNac) {
  const hoy = new Date()
  const nacimiento = new Date(fechaNac)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }
  return edad
}

// Formatea un numero como colones costarricenses
export function formatColones(num) {
  return '₡' + Math.abs(num).toLocaleString('es-CR', { minimumFractionDigits: 2 })
}

// Devuelve el mensaje final segun el resultado del juego
export function mensajeFinal(montoInicial, montoFinal) {
  if (montoFinal <= 0) return 'Lo perdiste todo..... No vuelvas a jugar!'
  if (montoFinal < montoInicial) return 'No deberias de jugar... Retirate'
  if (montoFinal === montoInicial) return 'Te salvaste....'
  return 'Eres un ganador'
}