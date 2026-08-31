import { seriesData } from '../data/series.js'
import '../css/problema1.css'

export default function Problema1Principal({ onSeleccionar }) {
  return (
    <div className="problema1-principal">
      <h1 className="problema1-titulo">L@s mejores 4 series 📺</h1>
      
      <div className="galeria-container">
        {seriesData.map((serie) => {
          const miniUrl = `/images/concepto/minis/${serie.imagen}`
          return (
            <div key={serie.id} className="tarjeta-serie">
              <img 
                src={miniUrl} 
                alt={serie.serie}
                className="tarjeta-imagen"
                onError={(e) => {
                  // Mostrar placeholder si la imagen no existe
                  e.target.style.backgroundColor = '#e0e0e0'
                  e.target.style.display = 'flex'
                  e.target.style.alignItems = 'center'
                  e.target.style.justifyContent = 'center'
                  e.target.textContent = `Imagen: ${serie.serie}\n(300x200px)`
                }}
              />
              <div className="tarjeta-contenido">
                <h3 className="tarjeta-titulo">{serie.serie}</h3>
                <p className="tarjeta-año">{serie.año}</p>
                <button 
                  className="tarjeta-boton"
                  onClick={() => onSeleccionar(serie)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
