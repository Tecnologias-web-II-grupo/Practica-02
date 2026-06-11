import { useState } from 'react'
import Eje4Registro from './pages/Eje4Registro.jsx'
import Eje4Juego from './pages/Eje4Juego.jsx'
import Eje4Resultado from './pages/Eje4Resultado.jsx'
import Problema1Principal from './pages/Problema1Principal.jsx'
import Problema1Detalle from './pages/Problema1Detalle.jsx'

export default function App() {
  const [ejercicio, setEjercicio] = useState('seleccion') // 'seleccion', 'eje4', 'problema1'
  const [pantalla, setPantalla] = useState('registro')
  const [jugador, setJugador] = useState(null)
  const [serieSeleccionada, setSerieSeleccionada] = useState(null)

  // --- Ejercicio 4 ---
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
    setEjercicio('seleccion')
  }

  // --- Problema 1 ---
  function irAProblem1() {
    setEjercicio('problema1')
    setSerieSeleccionada(null)
  }

  function seleccionarSerie(serie) {
    setSerieSeleccionada(serie)
  }

  function volverALista() {
    setSerieSeleccionada(null)
  }

  function volverASeleccion() {
    setEjercicio('seleccion')
    setSerieSeleccionada(null)
    setJugador(null)
    setPantalla('registro')
  }

  // --- Pantalla de selección ---
  if (ejercicio === 'seleccion') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 style={{ color: 'white', fontSize: '2.5rem', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Selecciona un Ejercicio
        </h1>
        <button 
          onClick={irAProblem1}
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ee5a52'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b6b'}
        >
          Problema 1 - Series Clásicas
        </button>
        <button 
          onClick={() => setEjercicio('eje4')}
          style={{
            padding: '15px 40px',
            fontSize: '1.2rem',
            backgroundColor: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#45b8ae'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4ecdc4'}
        >
          Ejercicio 4 - Juego
        </button>
      </div>
    )
  }

  // --- Ejercicio 4 ---
  if (ejercicio === 'eje4') {
    return (
      <>
        <button 
          onClick={volverASeleccion}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 1000
          }}
        >
          ← Menú
        </button>
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

  // --- Problema 1 ---
  if (ejercicio === 'problema1') {
    return (
      <>
        <button 
          onClick={volverASeleccion}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 1000
          }}
        >
          ← Menú
        </button>
        {!serieSeleccionada && (
          <Problema1Principal onSeleccionar={seleccionarSerie} />
        )}
        {serieSeleccionada && (
          <Problema1Detalle serie={serieSeleccionada} onVolver={volverALista} />
        )}
      </>
    )
  }
}