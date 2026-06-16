import { useState } from 'react'
import Index from './pages/Index.jsx'
import Eje4Registro from './pages/Eje4Registro.jsx'
import Eje4Juego from './pages/Eje4Juego.jsx'
import Eje4Resultado from './pages/Eje4Resultado.jsx'
import Problema1Principal from './pages/Problema1Principal.jsx'
import Problema1Detalle from './pages/Problema1Detalle.jsx'

export default function App() {
  const [pantalla, setPantalla] = useState('index')
  const [jugador, setJugador] = useState(null)
  const [serieSeleccionada, setSerieSeleccionada] = useState(null)

  // --- Navegación general ---
  function navegar(destino) {
    setPantalla(destino)
  }

  // --- Ejercicio 4 ---
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
    setSerieSeleccionada(null)
    setPantalla('index')
  }

  // --- Problema 1 ---
  function seleccionarSerie(serie) {
    setSerieSeleccionada(serie)
    setPantalla('problema1-detalle')
  }

  function volverALista() {
    setSerieSeleccionada(null)
    setPantalla('problema1')
  }

  // Botón de volver al menú reutilizable
  const BtnMenu = () => (
    <button
      onClick={volverAlMenu}
      style={{
        position: 'fixed', top: '20px', left: '20px',
        padding: '10px 20px', backgroundColor: '#667eea',
        color: 'white', border: 'none', borderRadius: '6px',
        cursor: 'pointer', fontWeight: 'bold', zIndex: 1000
      }}
    >
      ← Menú
    </button>
  )

  if (pantalla === 'index') {
    return <Index onNavegar={navegar} />
  }

  if (pantalla === 'eje4') {
    return (
      <>
        <BtnMenu />
        <Eje4Registro onAceptar={irAJuego} />
      </>
    )
  }

  if (pantalla === 'eje4-juego') {
    return (
      <>
        <BtnMenu />
        <Eje4Juego jugador={jugador} onFin={irAResultado} />
      </>
    )
  }

  if (pantalla === 'eje4-resultado') {
    return (
      <>
        <BtnMenu />
        <Eje4Resultado jugador={jugador} onReiniciar={() => setPantalla('eje4')} onInicio={volverAlMenu} />
      </>
    )
  }

  if (pantalla === 'problema1') {
    return (
      <>
        <BtnMenu />
        <Problema1Principal onSeleccionar={seleccionarSerie} />
      </>
    )
  }

  if (pantalla === 'problema1-detalle') {
    return (
      <>
        <BtnMenu />
        <Problema1Detalle serie={serieSeleccionada} onVolver={volverALista} />
      </>
    )
  }
}