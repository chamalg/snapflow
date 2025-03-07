"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFavorites, removeFavorite } from "../utils/api";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const EmptyStateText = styled.p`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: gray;
  margin-top: 30px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

export default function FavoriteList() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  const handleRemove = async (item: string) => {
    await removeFavorite(item);
    setFavorites(await getFavorites());
  };

  return (
    <List>
      {favorites.length === 0 ? (
        <EmptyStateText>No favorites yet.</EmptyStateText>
      ) : (
        favorites.map((item) => (
          <ListItem key={item}>
            {item}
            <button onClick={() => handleRemove(item)}>❌</button>
          </ListItem>
        ))
      )}
    </List>
  );
}
