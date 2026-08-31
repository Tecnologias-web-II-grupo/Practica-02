import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Pedido() {
  const navigate = useNavigate();

  const platos = {
    "Pollo en salsa blanca con hongos": 3000,
    "Costilla de cerdo agridulce": 3200,
    "Pescado en salsa de ostiones": 3500,
    "Beefsteack a la barbacoa": 4000
  };

  const opcionalesPrecios = {
    "Aros de cebolla": 500,
    "Vinagreta": 300,
    "Verduras al vapor": 600,
    "Tortilla casera": 400,
    "Puré nuestra tierra": 850
  };

  const bebidasPrecios = {
    "Gaseosa": 700,
    "Natural": 650,
    "Café negro": 500,
    "Café con leche": 550,
    "Agua": 300
  };

  const [cliente, setCliente] = useState("");
  const [plato, setPlato] = useState("");
  const [opcionales, setOpcionales] = useState([]);
  const [bebida, setBebida] = useState("");

  const combos = {
    combo1: {
      plato: "Pollo en salsa blanca con hongos",
      opcionales: ["Aros de cebolla"],
      bebida: "Gaseosa"
    },
    combo2: {
      plato: "Costilla de cerdo agridulce",
      opcionales: ["Vinagreta", "Tortilla casera"],
      bebida: "Natural"
    },
    combo3: {
      plato: "Pescado en salsa de ostiones",
      opcionales: ["Verduras al vapor", "Puré nuestra tierra"],
      bebida: "Agua"
    }
  };

  const seleccionarCombo = (combo) => {
    setPlato(combos[combo].plato);
    setOpcionales(combos[combo].opcionales);
    setBebida(combos[combo].bebida);
  };

  const cambiarOpcional = (op) => {
    if (opcionales.includes(op)) {
      setOpcionales(opcionales.filter((item) => item !== op));
    } else {
      setOpcionales([...opcionales, op]);
    }
  };

  const cancelar = () => {
    setCliente("");
    setPlato("");
    setOpcionales([]);
    setBebida("");
  };

  const aceptar = () => {
    if (cliente === "" || plato === "" || bebida === "") {
      alert("Debe llenar todos los campos obligatorios");
      return;
    }

    const pedido = {
      cliente,
      plato,
      opcionales,
      bebida,
      precios: {
        plato: platos[plato],
        opcionales: opcionales.map((op) => ({
          nombre: op,
          precio: opcionalesPrecios[op]
        })),
        bebida: bebidasPrecios[bebida]
      }
    };

    localStorage.setItem("pedido", JSON.stringify(pedido));
    navigate("/factura");
  };

  return (
    <div className="container">
      <h2>Pedido de comida</h2>

      <label>Cliente:</label>
      <input
        type="text"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />

      <div className="combos">
        <button onClick={() => seleccionarCombo("combo1")}>Combo 1</button>
        <button onClick={() => seleccionarCombo("combo2")}>Combo 2</button>
        <button onClick={() => seleccionarCombo("combo3")}>Combo 3</button>
      </div>

      <h3>Plato fuerte</h3>
      <select value={plato} onChange={(e) => setPlato(e.target.value)}>
        <option value="">Seleccione</option>
        {Object.keys(platos).map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <h3>Opcionales</h3>
      {Object.keys(opcionalesPrecios).map((op) => (
        <div key={op}>
          <input
            type="checkbox"
            checked={opcionales.includes(op)}
            onChange={() => cambiarOpcional(op)}
          />
          {op}
        </div>
      ))}

      <h3>Bebida</h3>
      {Object.keys(bebidasPrecios).map((b) => (
        <div key={b}>
          <input
            type="radio"
            name="bebida"
            checked={bebida === b}
            onChange={() => setBebida(b)}
          />
          {b}
        </div>
      ))}

      <div className="botones">
        <button onClick={cancelar}>Cancelar</button>
        <button onClick={aceptar}>Aceptar</button>
      </div>
    </div>
  );
}

export default Pedido; 