"use client";
import { useEffect, useState } from "react";
import { getFavorites, getItems } from "@/utils/api";
import { useItems } from "@/context/ItemsContext";
import ItemCard from "./ItemCard";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function ItemList() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { items } = useItems();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFavorites = await getFavorites();
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
