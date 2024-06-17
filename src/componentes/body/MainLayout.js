import React, { useState } from 'react';
import Header from '../header/Header';
import Carrusel from '../Carrusel/Carrusel';
import ShoppingCart from './shoppingcart';
import CardList from './CardList';
import data from './data'; // Importa el archivo de datos de productos

import './Cards.js';
import VistaProductoModal from '../body/VistaProducto';

const MainLayout = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false); // Controlar la visibilidad del carrito
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null); // Estado para la notificación
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

  const clearCart = () => {
    setCart([]); // Reiniciar el carrito
  };
  // Alternar visibilidad del carrito
  const toggleCartVisibility = () => {
    setIsCartVisible(prev => !prev);
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Función para añadir productos al carrito
  const addToCart = idProduct => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.product_id === idProduct);
      if (existingProduct) {
        return prevCart.map(item =>
          item.product_id === idProduct ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product_id: idProduct, quantity: 1 }];
      }
    });

    // Mostrar la notificación de compra
    const product = data.find(item => item.id === idProduct);
    if (product) {
      console.log(`Se ha agregado al carrito: ${product.Nombre}`);
      setNotification(`${product.Nombre} se ha agregado al carrito`);
      setTimeout(() => {
        setNotification(null);
      }, 3000); // Ocultar la notificación después de 3 segundos
    }
  };

  // Función para actualizar la cantidad de productos
  const updateQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        // Si la cantidad es cero, elimina el producto del carrito
        return prevCart.filter(item => item.product_id !== productId);
      } else {
        // Si la cantidad es mayor a cero, actualiza la cantidad
        return prevCart.map(item =>
          item.product_id === productId ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  const openProductModal = (product) => {
    setSelectedProduct(product); // Abrir el modal con el producto seleccionado
  };

  const closeProductModal = () => {
    setSelectedProduct(null); // Cerrar el modal
  };

  return (
    <div>
      <Header onCartClick={toggleCartVisibility} cartItemCount={getTotalItemsInCart()} />
      <Carrusel />
      
      <CardList onAddToCart={addToCart} onProductClick={openProductModal} /> {/* Configurar para abrir el modal */}
      
      {selectedProduct && (
        <VistaProductoModal producto={selectedProduct} onClose={closeProductModal} /> 
      )}

      {children}

      
      {/* ShoppingCart recibe la función para actualizar la cantidad */}
      <ShoppingCart 
        cart={cart}
        isVisible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
        updateQuantity={updateQuantity} // Se pasa la función para actualizar cantidad
        clearCart={clearCart} // Pasar la función para vaciar el carrito

      />

     
     
    </div>
  );
};

export default MainLayout;
