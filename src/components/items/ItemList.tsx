"use client";
import { useEffect, useState } from "react";
import { getFavorites, getItems } from "@/utils/api";
import { Item } from "@/interfaces/item";
import ItemCard from "./ItemCard";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await getItems();
      const fetchedFavorites = await getFavorites();
      setItems(fetchedItems);
      setFavoriteIds(fetchedFavorites);
    };
    fetchData();
  }, []);

  return (
    <List>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isFavorite={favoriteIds.includes(item.id)}
          setFavoriteIds={setFavoriteIds}
        />
      ))}
    </List>
  );
}
