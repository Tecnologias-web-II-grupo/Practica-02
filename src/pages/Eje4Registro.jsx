import { useState } from 'react'
import { calcularEdad } from '../js/eje4.js'
import '../css/eje4.css'

export default function Eje4Registro({ onAceptar }) {
  const [fechaNac, setFechaNac] = useState('')
  const [edadOk, setEdadOk] = useState(false)
  const [rechazado, setRechazado] = useState(false)
  const [contador, setContador] = useState(5)
  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')
  const [dados, setDados] = useState('2')
  const [error, setError] = useState('')

  function verificarEdad() {
    if (!fechaNac) {
      setError('Debe ingresar su fecha de nacimiento.')
      return
    }
    const edad = calcularEdad(fechaNac)
    if (edad < 21) {
      setRechazado(true)
      let seg = 5
      const intervalo = setInterval(() => {
        seg--
        setContador(seg)
        if (seg <= 0) {
          clearInterval(intervalo)
          setRechazado(false)
          setContador(5)
          setFechaNac('')
          setEdadOk(false)
        }
      }, 1000)
    } else {
      setEdadOk(true)
      setError('')
    }
  }

  function handleAceptar() {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio.')
      return
    }
    const montoNum = parseFloat(monto)
    if (!monto || isNaN(montoNum) || montoNum <= 0) {
      setError('Ingrese un monto valido mayor a cero.')
      return
    }
    setError('')
    onAceptar({
      nombre: nombre.trim(),
      montoInicial: montoNum,
      montoDisponible: montoNum,
      cantidadDados: parseInt(dados),
    })
  }

  if (rechazado) {
    return (
      <div className="eje4-wrapper">
        <div className="rechazo-card">
          <h2>Acceso Denegado</h2>
          <p>Lo sentimos, debe tener minimo 21 anhos para participar en el juego.</p>
          <p>Redirigiendo en <strong>{contador}</strong> segundos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="eje4-wrapper">
      <div className="registro-card">
        <h1>Juego de Dados</h1>

        {!edadOk && (
          <>
            <h2>Verificacion de Edad</h2>
            <p>Solo mayores de 21 anos pueden jugar.</p>
            <div className="campo">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                value={fechaNac}
                onChange={e => setFechaNac(e.target.value)}
              />
            </div>
            {error && <p className="texto-error">{error}</p>}
            <button className="btn-principal" onClick={verificarEdad}>
              Verificar Edad
            </button>
          </>
        )}

        {edadOk && (
          <>
            <h2>Datos del Jugador</h2>
            <div className="campo">
              <label>Nombre completo</label>
              <input
                type="text"
                placeholder="Ej: Juan Perez"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className="campo">
              <label>Fondo de apuestas (colones)</label>
              <input
                type="number"
                placeholder="Ej: 500000"
                value={monto}
                onChange={e => setMonto(e.target.value)}
                min="1"
              />
            </div>
            <div className="campo">
              <label>Cantidad de dados</label>
              <select value={dados} onChange={e => setDados(e.target.value)}>
                <option value="2">2 dados — sumas del 2 al 12</option>
                <option value="3">3 dados — sumas del 3 al 18</option>
              </select>
            </div>
            {error && <p className="texto-error">{error}</p>}
            <button className="btn-principal" onClick={handleAceptar}>
              Ingresar al Juego
            </button>
          </>
        )}
      </div>
    </div>
  )
}