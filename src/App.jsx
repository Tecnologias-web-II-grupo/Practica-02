import { useState } from 'react'
import Index from './pages/Index.jsx'
import Eje4Registro from './pages/Eje4Registro.jsx'
import Eje4Juego from './pages/Eje4Juego.jsx'
import Eje4Resultado from './pages/Eje4Resultado.jsx'

export default function App() {
  const [pantalla, setPantalla] = useState('index')
  const [jugador, setJugador] = useState(null)

  function irAJuego(datos) {
    setJugador(datos)
    setPantalla('eje4-juego')
  }

  function irAResultado(datosFinales) {
    setJugador(datosFinales)
    setPantalla('eje4-resultado')
  }

  function volverAlMenu() {
    setJugador(null)
    setPantalla('index')
  }

  return (
    <>
      {pantalla === 'index' && (
        <Index onNavegar={destino => setPantalla(destino + '-registro')} />
      )}
      {pantalla === 'eje4-registro' && (
        <Eje4Registro onAceptar={irAJuego} onVolver={volverAlMenu} />
      )}
      {pantalla === 'eje4-juego' && (
        <Eje4Juego jugador={jugador} onFin={irAResultado} />
      )}
      {pantalla === 'eje4-resultado' && (
        <Eje4Resultado jugador={jugador} onReiniciar={() => setPantalla('eje4-registro')} onInicio={volverAlMenu} />
      )}
    </>
  )
}