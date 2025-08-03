"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the basket item type
export type BasketItem = {
  id: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
};

// Define the basket state shape
type BasketState = {
  items: BasketItem[];
};

// Define possible actions
type Action =
  | { type: "ADD_TO_BASKET"; payload: BasketItem }
  | { type: "INCREASE_QUANTITY"; payload: { id: string } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string } }
  | { type: "REMOVE_FROM_BASKET"; payload: { id: string } }
  | { type: "RESET_BASKET" };  // <-- added this action

// Initial state for the basket
const initialState: BasketState = {
  items: [],
};

// Create context with a null default value
const BasketContext = createContext<{
  state: BasketState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Reducer function to handle basket actions
function basketReducer(state: BasketState, action: Action): BasketState {
  switch (action.type) {
    case "ADD_TO_BASKET": {
      const itemExists = state.items.find((item) => item.id === action.payload.id);
      if (itemExists) {
        // Increase quantity if item already exists
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Add new item with quantity 1
        return {
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case "INCREASE_QUANTITY": {
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case "DECREASE_QUANTITY": {
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };
    }
    case "REMOVE_FROM_BASKET": {
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case "RESET_BASKET": {
      return {
        items: [],
      };
    }
    default:
      return state;
  }
}

// Provider component that wraps the app or part of app where basket state is needed
export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
};

// Hook to use basket context, throws error if used outside provider
export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
