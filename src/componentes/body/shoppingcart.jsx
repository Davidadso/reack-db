import React from "react";
import classNames from 'classnames'; // Para manejar clases condicionales
import FlechaIzquierda from '@mui/icons-material/ArrowBackIosNew';
import FlechaDerecha from '@mui/icons-material/ArrowForwardIos';
import data from './data'; // Lista de datos de productos
import "./card.css"; // Asegúrate de tener el archivo de estilos
import Swal from 'sweetalert2';

const ShoppingCart = ({ cart = [], isVisible, onClose, updateQuantity, clearCart }) => {
  const getProductDetails = (productId) => {
    return data.find((item) => item.id === productId); // Encuentra el producto por su ID
  };

  const handleBuyClick = () => {
    if (cart.length > 0) {
      Swal.fire({
        title: "Se hizo su compra",
        
        icon: "success",
        timer: 1000, // Cerrar el mensaje automáticamente después de 3 segundos
        showConfirmButton: false
      });
      clearCart(); // Vacía el carrito después de la compra
      onClose(); // Cierra el carrito
    } else {
      alert("El carrito está vacío. Agregue productos antes de comprar.");
    }
  };

  // Calcular el precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      const product = getProductDetails(cartItem.product_id);
      if (!product) {
        return total; // Si no encuentra el producto, mantiene el total
      }
      const precio = parseFloat(product.precio.replace(/[^\d.-]/g, '')); // Extraer el número del precio
      return total + precio * cartItem.quantity; // Multiplicar por la cantidad
    }, 0);
  };

  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      clearCart(); // Confirma antes de vaciar el carrito
    }
  };

  return (
    <div className={classNames('container', { 'showCart': isVisible })}>
      <div className="cartTab">
        <h1>Carrito</h1>

        <div className="listCart">
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            cart.map((cartItem) => {
              const product = getProductDetails(cartItem.product_id);

              if (!product) {
                return null; // Si no encuentra el producto, no muestra nada
              }

              return (
                <div key={cartItem.product_id} className="item">
                  <div className="image">
                    <img src={product.image} alt={product.title} /> {/* Imagen del producto */}
                  </div>
                  <div className="name">
                    {product.title} {/* Nombre del producto */}
                  </div>
                  <div className="totalPrice">
                    {product.precio} por unidad {/* Precio por unidad */}
                  </div>
                  <div className="quantity">
                    <span
                      className="minus"
                      onClick={() => updateQuantity(cartItem.product_id, cartItem.quantity - 1)} 
                    >
                      <FlechaIzquierda />
                    </span>
                    <span>{cartItem.quantity}</span> {/* Cantidad */}
                    <span
                      className="plus"
                      onClick={() => updateQuantity(cartItem.product_id, cartItem.quantity + 1)} 
                    >
                      <FlechaDerecha />
                    </span>
                  </div>

                </div>
              );
            })
          )}
        </div>

        <div className="cartTotal">
          Total del Carrito: ${getTotalPrice().toFixed(2)} {/* Total del carrito */}
        </div>

        <div className="btn">
          <button className="close" onClick={onClose}>
            CERRAR
          </button>
          
          <button className="checkOut" onClick={handleBuyClick}>
            COMPRAR
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart; 
