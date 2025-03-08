import React, { createContext, useContext, useState, useEffect } from "react";
import { getItems } from "@/utils/api";  
import { Item } from "@/interfaces/item";

interface ItemsContextType {
  items: Item[];
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await getItems();
      setItems(fetchedItems); 
    };

    fetchItems();
  }, []); 

  return (
    <ItemsContext.Provider value={{ items }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = (): ItemsContextType => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};
