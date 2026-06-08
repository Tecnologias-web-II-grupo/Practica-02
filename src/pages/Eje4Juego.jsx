import { useState } from 'react'
import { lanzarDados, formatColones } from '../js/eje4.js'
import '../css/eje4.css'

const extensiones = {
  1: 'png',
  2: 'png',
  3: 'png',
  4: 'jpg',
  5: 'jpg',
  6: 'png'
}

function imagenDado(valor) {
  return '/images/eje4/dado' + valor + '.' + extensiones[valor]
}

export default function Eje4Juego({ jugador, onFin }) {
  const { cantidadDados, montoInicial } = jugador
  const minNum = cantidadDados === 2 ? 2 : 3
  const maxNum = cantidadDados === 2 ? 12 : 18

  const numeros = Array.from(
    { length: maxNum - minNum + 1 },
    (_, i) => i + minNum
  )

  const [montoDisponible, setMontoDisponible] = useState(jugador.montoDisponible)
  const [montoApostado, setMontoApostado] = useState('')
  const [elegido, setElegido] = useState(null)
  const [valoresDados, setValoresDados] = useState([])
  const [estatus, setEstatus] = useState('pendiente')
  const [msgRonda, setMsgRonda] = useState('')
  const [consecutivas, setConsecutivas] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [error, setError] = useState('')

  function handleJugar() {
    if (!elegido) {
      setError('Debe elegir un numero del tablero.')
      return
    }
    const apuesta = parseFloat(montoApostado)
    if (!montoApostado || isNaN(apuesta) || apuesta <= 0) {
      setError('Ingrese un monto a apostar.')
      return
    }
    if (apuesta > montoDisponible) {
      setError('No puede apostar mas de lo disponible.')
      return
    }
    setError('')

    const { valores, suma } = lanzarDados(cantidadDados)
    setValoresDados(valores)

    const gano = suma === elegido
    let nuevoMonto = montoDisponible
    let nuevasConsec = consecutivas

    if (gano) {
      nuevoMonto = montoDisponible + apuesta
      nuevasConsec = consecutivas + 1
      setEstatus('gano')
      setMsgRonda('Ganaste! La suma fue ' + suma + '. +' + formatColones(apuesta))
    } else {
      nuevoMonto = montoDisponible - apuesta
      nuevasConsec = 0
      setEstatus('perdio')
      setMsgRonda('Perdiste. La suma fue ' + suma + '. -' + formatColones(apuesta))
    }

    setMontoDisponible(nuevoMonto)
    setConsecutivas(nuevasConsec)

    if (nuevoMonto <= 0 || nuevasConsec >= 3) {
      setTerminado(true)
      setTimeout(() => {
        onFin({ ...jugador, montoFinal: nuevoMonto })
      }, 2500)
    }
  }

  const dadosMostrar = valoresDados.length > 0
    ? valoresDados
    : Array.from({ length: cantidadDados }, () => 6)

  return (
    <div className="eje4-wrapper">
      <div className="juego-wrapper">

        <div className="cabecera">
          <div className="cabecera-jugador">
            <span className="etiqueta">Jugador</span>
            <span className="valor">{jugador.nombre}</span>
          </div>
          <div className="cabecera-montos">
            <div className="monto-fila">
              <span className="etiqueta">Monto disponible</span>
              <span className="valor">{formatColones(montoDisponible)}</span>
            </div>
            <div className="monto-fila">
              <span className="etiqueta">Monto apostado</span>
              <span className="valor">
                {montoApostado && !isNaN(parseFloat(montoApostado))
                  ? formatColones(parseFloat(montoApostado))
                  : formatColones(0)}
              </span>
            </div>
          </div>
        </div>

        <div className="area-principal">

          <div className="seccion-dados">
            <h3>Dados</h3>
            <div className="dados-fila">
              {dadosMostrar.map((val, i) => (
                <img
                  key={i}
                  src={imagenDado(val)}
                  alt={'dado ' + val}
                  className="dado-img"
                />
              ))}
            </div>
            <div className="campo-apuesta">
              <label>Monto a apostar (colones)</label>
              <input
                type="number"
                value={montoApostado}
                onChange={e => setMontoApostado(e.target.value)}
                min="1"
                max={montoDisponible}
                disabled={terminado}
              />
            </div>
            <button
              className="btn-jugar"
              onClick={handleJugar}
              disabled={terminado}
            >
              J U G A R
            </button>
          </div>

          <div className="seccion-tablero">
            <h3>Tablero de Apuestas</h3>
            <div className="tablero-grid">
              <div className="celda celda-bloqueada"></div>
              {numeros.map(num => (
                <div
                  key={num}
                  className={'celda ' + (elegido === num ? 'celda-seleccionada' : 'celda-libre')}
                  onClick={() => !terminado && setElegido(num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="seccion-estatus">
            <h3>Estatus</h3>
            <div className="icono-estatus">
              {estatus === 'pendiente' && '?'}
              {estatus === 'gano' && (
                <img
                  src="/images/eje4/cara-feliz.jpg"
                  alt="Gano"
                  className="img-estatus"
                />
              )}
              {estatus === 'perdio' && (
                <img
                  src="/images/eje4/cara-triste.png"
                  alt="Perdio"
                  className="img-estatus"
                />
              )}
            </div>
            {msgRonda && <p className="msg-resultado">{msgRonda}</p>}
            {consecutivas > 0 && (
              <p className="consecutivas">Victorias seguidas: {consecutivas} / 3</p>
            )}
          </div>

        </div>

        {error && <p className="texto-error" style={{ textAlign: 'center' }}>{error}</p>}
        {terminado && <p className="msg-fin">Juego terminado. Calculando resultado...</p>}

      </div>
    </div>
  )
}