import '../css/problema1.css'

export default function Problema1Detalle({ serie, onVolver }) {
  if (!serie) {
    return <div>Selecciona una serie</div>
  }

  const principalUrl = `/images/concepto/principales/${serie.imagen}`
  const miniUrl = `/images/concepto/minis/${serie.imagen}`

  return (
    <div className="problema1-detalle">
      <div className="detalle-container">
        <div className="detalle-header">
          <img 
            src={principalUrl} 
            alt={serie.serie}
            className="detalle-imagen"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = miniUrl
            }}
          />
          
          <div className="detalle-info">
            <h1 className="detalle-titulo">{serie.serie}</h1>
            
            <div className="detalle-seccion">
              <h3 className="detalle-subtitulo">Año de Emisión</h3>
              <p className="detalle-texto">{serie.año}</p>
            </div>
            
            <div className="detalle-seccion">
              <h3 className="detalle-subtitulo">Actores Principales</h3>
              <ul className="detalle-actores">
                {serie.actores.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="detalle-observaciones">
          <h3 className="detalle-subtitulo">Observaciones</h3>
          <p>{serie.observaciones}</p>
        </div>
        
        <button className="boton-volver" onClick={onVolver}>
          Volver a la lista
        </button>
      </div>
    </div>
  )
}
