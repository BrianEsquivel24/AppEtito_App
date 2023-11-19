import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        const existingItem = state.cart.find(item => item.id === action.payload.id);

        if (existingItem) {
          // Si el producto ya está en el carrito, actualizar la cantidad
          return {
            ...state,
            cart: state.cart.map(item =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          // Si el producto no está en el carrito, agregarlo
          return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) };
    case 'CLEAR_CART':
      return { ...state, cart: [] }; // Nueva acción para limpiar el carrito
    case 'ADD_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'REDUCE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    default:
      return state;
  }
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addQuantity = (item) => {
    dispatch({ type: 'ADD_QUANTITY', payload: item });
  };

  const reduceQuantity = (item) => {
    dispatch({ type: 'REDUCE_QUANTITY', payload: item });
  };

  const total = calculateTotalPrice(state.cart);

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, clearCart, addQuantity, reduceQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
