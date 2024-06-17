import React, { useRef, useEffect } from 'react';
import './VistaProducto.css'; // Importamos los estilos para esta página

const VistaProducto = ({ product, onClose, onAddToCart }) => {
  const vistaProductoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (vistaProductoRef.current && !vistaProductoRef.current.contains(event.target)) {
        onClose(); // Cierra el cuadro si se hace clic fuera de él
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    // Llama a la función onAddToCart y pasa el ID del producto
    onAddToCart(product.id);
  };

  return (
    <div className="vista-producto" ref={vistaProductoRef}>
      {/* Botón de cerrar */}
      <button className="close-btn" onClick={onClose}>X</button>
      {/* Contenido de la vista del producto */}
      <div className="vista-producto-content">
        <img src={product.image} alt={product.Nombre} />
        <div className="top-content">
          <h6>{product.Nombre}</h6>
          <p>{product.Capacidad}</p>
          <h6 className="price">Precio: {product.precio}</h6>
        </div>
        {/* Botón para añadir al carrito */}
       
        {/* Botón para ver más */}
        <button
          type="button"
          className="verMas"
          onClick={() => console.log("Ver más")}
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default VistaProducto;
