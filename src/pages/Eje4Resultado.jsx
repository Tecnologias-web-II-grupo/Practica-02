import { mensajeFinal, formatColones } from '../js/eje4.js'
import '../css/eje4.css'

export default function Eje4Resultado({ jugador, onReiniciar }) {
  const { nombre, montoInicial, montoFinal } = jugador
  const msg = mensajeFinal(montoInicial, montoFinal)

  function clasesMensaje() {
    if (montoFinal <= 0) return 'resultado-mensaje msg-cero'
    if (montoFinal < montoInicial) return 'resultado-mensaje msg-perdio'
    if (montoFinal === montoInicial) return 'resultado-mensaje msg-empate'
    return 'resultado-mensaje msg-ganador'
  }

  return (
    <div className="eje4-wrapper">
      <div className="resultado-card">
        <h1>Resultado Final</h1>

        <div className={clasesMensaje()}>
          {msg}
        </div>

        <table className="tabla-final">
          <tbody>
            <tr>
              <td>Jugador</td>
              <td>{nombre}</td>
            </tr>
            <tr>
              <td>Monto inicial</td>
              <td>{formatColones(montoInicial)}</td>
            </tr>
            <tr>
              <td>Monto final</td>
              <td>{formatColones(Math.max(0, montoFinal))}</td>
            </tr>
            <tr>
              <td>Diferencia</td>
              <td>{formatColones(montoFinal - montoInicial)}</td>
            </tr>
          </tbody>
        </table>

        <div className="botones-resultado">
          <button className="btn-principal" onClick={onReiniciar}>
            Jugar de Nuevo
          </button>
        </div>
      </div>
    </div>
  )
}