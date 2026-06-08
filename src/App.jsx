import { useState } from 'react'
import Eje4Registro from './pages/Eje4Registro.jsx'
import Eje4Juego from './pages/Eje4Juego.jsx'
import Eje4Resultado from './pages/Eje4Resultado.jsx'

export default function App() {
  const [pantalla, setPantalla] = useState('registro')
  const [jugador, setJugador] = useState(null)

  function irAJuego(datos) {
    setJugador(datos)
    setPantalla('juego')
  }

  function irAResultado(datosFinales) {
    setJugador(datosFinales)
    setPantalla('resultado')
  }

  function reiniciar() {
    setJugador(null)
    setPantalla('registro')
  }

  return (
    <>
      {pantalla === 'registro' && (
        <Eje4Registro onAceptar={irAJuego} />
      )}
      {pantalla === 'juego' && (
        <Eje4Juego jugador={jugador} onFin={irAResultado} />
      )}
      {pantalla === 'resultado' && (
        <Eje4Resultado jugador={jugador} onReiniciar={reiniciar} />
      )}
    </>
  )
}