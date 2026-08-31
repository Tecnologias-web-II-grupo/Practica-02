import '../css/index.css'

const ejercicios = [
  {
    id: 1,
    titulo: 'Ejercicio 1',
    descripcion: 'Galeria de imagenes con pagina de detalle.',
    destino: 'problema1',
    disponible: true,
  },
  {
    id: 2,
    titulo: 'Ejercicio 2',
    descripcion: 'Sistema de pedidos de soda universitaria con factura.',
    destino: 'eje2',
    disponible: false,
  },
  {
    id: 3,
    titulo: 'Ejercicio 3',
    descripcion: 'Quiz de vocabulario estilo diccionario.',
    destino: 'eje3',
    disponible: true,
  },
  {
    id: 4,
    titulo: 'Ejercicio 4',
    descripcion: 'Juego de apuestas con dados.',
    destino: 'eje4',
    disponible: true,
  },
]

export default function Index({ onNavegar }) {
  return (
    <div className="index-wrapper">
      <div className="index-encabezado">
        <h1>Practica 02</h1>
        <p>ITI-523 — Tecnologias y Sistemas Web II</p>
      </div>
      <div className="index-grid">
        {ejercicios.map(eje => (
          <div
            key={eje.id}
            className={'index-card' + (!eje.disponible ? ' card-deshabilitada' : '')}
          >
            <div className="card-numero">0{eje.id}</div>
            <h2>{eje.titulo}</h2>
            <p>{eje.descripcion}</p>
            <button
              onClick={() => eje.disponible && onNavegar(eje.destino)}
              disabled={!eje.disponible}
            >
              {eje.disponible ? 'Abrir' : 'Proximamente'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}