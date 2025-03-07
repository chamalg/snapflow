"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  getItems,
} from "@/utils/api";
import { Item } from "@/interfaces/item";
import { FaHeart } from "react-icons/fa";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: white;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const UserName = styled.span`
  color: steelblue;
  font-weight: bold;
`;

const ItemImageWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const UserImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const ItemContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FavoriteButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ItemFooter = styled.div`
  margin-top: 10px;
`;

const FooterDetails = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
`;

const ItemName = styled.p`
  font-size: 18px;
  font-weight: normal;
  margin: 0;
  text-shadow: 1px 1px 2px #0000001a;
`;

const ItemPrice = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 2px #0000001a;
`;

const Likes = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: royalblue;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Description = styled.p`
  font-size: 14px;
  color: gray;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Comments = styled.p`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  cursor: pointer;
`;

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await getItems();
      const fetchedFavorites = await getFavorites();
      setItems(fetchedItems);
      setFavoriteIds(fetchedFavorites);
    };
    fetchData();
  }, []);

  const toggleFavorite = async (id: number) => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
    if (favoriteIds.includes(id)) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
    setFavoriteIds(await getFavorites());
  };

  const renderDescription = (text: string) => {
    return text.split(/(#[\w]+)/g).map((part, index) =>
      part.startsWith("#") ? (
        <span
          key={index}
          style={{ color: "dodgerblue", fontWeight: "bold", cursor: "pointer" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          {/* User Details */}
          <ItemHeader>
            <UserImageWrapper>
              <Image
                src={item.avatar}
                alt={item.itemName}
                width={40}
                height={40}
              />
            </UserImageWrapper>
            <UserName>{item.userName}</UserName>
          </ItemHeader>

          <ItemContent>
            <FooterDetails>
              <div>
                <ItemName>{item.itemName}</ItemName>
                <ItemPrice>{`AED ${item.price}`}</ItemPrice>
              </div>
            </FooterDetails>

            <ItemImageWrapper>
              <Image
                src={item.image}
                alt="Product"
                width={500}
                height={300}
                layout="responsive"
              />
            </ItemImageWrapper>

            <FavoriteButton
              onClick={() => toggleFavorite(item.id)}
              disabled={clicked}
            >
              <FaHeart
                color={favoriteIds.includes(item.id) ? "#FF3B30" : "#A0A0A0"}
                style={{
                  filter: "drop-shadow(0px 0px 2px white)",
                }}
              />
            </FavoriteButton>
          </ItemContent>

          {/* Footer */}
          <ItemFooter>
            <Likes>
              <FaHeart color="steelblue" /> {item.likes} Likes
            </Likes>
            <Description>{renderDescription(item.description)}</Description>
            <Comments>
              {item.noOfComments === 0
                ? "No comments"
                : `View ${item.noOfComments} comment${
                    item.noOfComments === 1 ? "" : "s"
                  }`}
            </Comments>
          </ItemFooter>
        </ListItem>
      ))}
    </List>
  );
}
