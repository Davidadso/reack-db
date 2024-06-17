// Cards.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import VistaProductoModal from './VistaProducto'; // Importar el componente del modal
import './VistaProducto.css'; // Importamos los estilos para esta página


const Cards = ({ item, onAddToCart, isLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToCart = () => {

    Swal.fire({
      title: "Agregado al carrito",
      text: `${item.Nombre} se ha agregado al carrito`,
      icon: "success",
      timer: 1000, // Cerrar el mensaje automáticamente después de 3 segundos
      showConfirmButton: false
    });
    onAddToCart(item.id);
  };








  return (
    <div className="listProduct">
      <div className="item">
        <img src={item.image} alt={item.Nombre} onClick={() => setIsModalOpen(true)} />
        <div className="top-content">
          <h6>{item.Nombre}</h6>

          <h6 className="price">Precio: {item.precio}</h6>
        </div>
        <div>

          <button
            type="button"
            className="addCart"
            onClick={addToCart}
          >
            Agregar
          </button>


        </div>

      </div>
      {
        isModalOpen && (
          <VistaProductoModal
            product={item}
            onClose={() => setIsModalOpen(false)} // Cerrar el modal
          />
        )
      }

    </div>
  );
};

export default Cards;
