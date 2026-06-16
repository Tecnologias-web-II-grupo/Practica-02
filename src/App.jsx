import { useState } from 'react'
import Index from './pages/index.jsx'
import Eje4Registro from './pages/Eje4Registro.jsx'
import Eje4Juego from './pages/Eje4Juego.jsx'
import Eje4Resultado from './pages/Eje4Resultado.jsx'
import Problema1Principal from './pages/Problema1Principal.jsx'
import Problema1Detalle from './pages/Problema1Detalle.jsx'
import QuizForm from './components/QuizForm'
import ResultsTable from './components/ResultsTable'
import { vocabularyData } from './data/vocabulary'

export default function App() {
  const [pantalla, setPantalla] = useState('index')
  const [jugador, setJugador] = useState(null)
  const [serieSeleccionada, setSerieSeleccionada] = useState(null)
  const [quizRespuestas, setQuizRespuestas] = useState([])
  const [quizTerminado, setQuizTerminado] = useState(false)

  function volverAlMenu() {
    setJugador(null)
    setSerieSeleccionada(null)
    setQuizTerminado(false)
    setQuizRespuestas([])
    setPantalla('index')
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

  // --- Problema 1 ---
  function seleccionarSerie(serie) {
    setSerieSeleccionada(serie)
    setPantalla('problema1-detalle')
  }

  function volverALista() {
    setSerieSeleccionada(null)
    setPantalla('problema1')
  }

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
    return <Index onNavegar={setPantalla} />
  }

  // --- Ejercicio 3 ---
  if (pantalla === 'eje3') {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <BtnMenu />
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 text-center pt-14">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
              Práctica de Vocabulario 🇬🇧
            </h1>
            <p className="text-gray-600 font-medium">
              Adivina las {vocabularyData.length} palabras en inglés.
            </p>
          </header>
          {!quizTerminado ? (
            <QuizForm
              data={vocabularyData}
              onFinish={(ans) => { setQuizRespuestas(ans); setQuizTerminado(true) }}
            />
          ) : (
            <ResultsTable data={vocabularyData} answers={quizRespuestas} />
          )}
        </div>
      </div>
    )
  }

  // --- Ejercicio 4 ---
  if (pantalla === 'eje4') {
    return <Eje4Registro onAceptar={irAJuego} onVolver={volverAlMenu} />
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

  // --- Problema 1 ---
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