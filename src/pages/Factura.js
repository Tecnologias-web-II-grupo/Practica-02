import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Factura() {
  const navigate = useNavigate();
  const pedido = JSON.parse(localStorage.getItem("pedido"));

  if (!pedido) {
    return <h2>No hay pedido registrado</h2>;
  }

  const subtotalOpcionales = pedido.precios.opcionales.reduce(
    (acc, item) => acc + item.precio,
    0
  );

  const subtotal =
    pedido.precios.plato +
    subtotalOpcionales +
    pedido.precios.bebida;

  const iva = subtotal * 0.15;
  const total = subtotal + iva; 

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("pedido");
      navigate("/");
    }, 10000);
  }, [navigate]);

  return (
    <div className="factura">
      <h2>Universidad Técnica Nacional</h2>
      <h3>Sistema Integrado de Sodas Universitaria</h3>

      <p><strong>Factura:</strong> 00000001</p>
      <p><strong>Fecha:</strong> {new Date().toLocaleString()}</p>

      <hr />

      <p><strong>Cliente:</strong> {pedido.cliente}</p>
      <p><strong>Plato fuerte:</strong> {pedido.plato} ₡{pedido.precios.plato}</p>

      <p><strong>Opcionales:</strong></p>
      {pedido.precios.opcionales.map((op, index) => (
        <p key={index}>
          {op.nombre} ₡{op.precio}
        </p>
      ))}

      <p><strong>Bebida:</strong> {pedido.bebida} ₡{pedido.precios.bebida}</p>

      <hr />

      <p><strong>Subtotal:</strong> ₡{subtotal}</p>
      <p><strong>Impuestos (15%):</strong> ₡{iva}</p>
      <p><strong>Total:</strong> ₡{total}</p>
    </div>
  );
}

export default Factura;