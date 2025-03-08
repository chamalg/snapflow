"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useItems } from "@/context/ItemsContext";
import { getFavorites, removeFavorite } from "../utils/api";
import { FaTrash } from "react-icons/fa";
import { Item } from "@/interfaces/item";
import UserProfileHeader from "./items/UserProfileHeader";


const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #4f4f4f;
  margin: 0;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  color: gray;   
  margin: 5px 0;  
  font-weight: normal;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  color: red;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: darkred;
  }
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
  const [favoriteIds, setFavoritesIds] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Item[]>([]);
  const { items } = useItems();

  useEffect(() => {
    const fetchFavoriteIds = async () => {
      const fetchedFavorites = await getFavorites();
      setFavoritesIds(fetchedFavorites); 
    };

    fetchFavoriteIds();
  }, []);

  useEffect(() => {
    const favoriteItemsList = items.filter((item) => favoriteIds.includes(item.id));
    setFavoriteItems(favoriteItemsList); 
  }, [favoriteIds, items]);

  const handleRemove = async (id: number) => {
    await removeFavorite(id);
    setFavoritesIds(await getFavorites());
  };

  return (
    <List>
      {favoriteItems.length === 0 ? (
        <EmptyStateText>Whoops! No favorites yet!</EmptyStateText>
      ) :(
        favoriteItems.map((item) => (
          <ListItem key={item.id}>
            <div>
              <UserProfileHeader avatar={item.avatar} userName={item.userName} />
              <ItemDetails>
                <ItemName>{item.itemName}</ItemName>
                <ItemPrice>AED {item.price}</ItemPrice>
              </ItemDetails>
            </div>
            <RemoveButton onClick={() => handleRemove(item.id)}>
              <FaTrash />
            </RemoveButton>
          </ListItem>
        ))
      )}
    </List>
  );
}
