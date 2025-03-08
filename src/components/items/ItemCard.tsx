import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import styled from "styled-components";
import { removeFavorite, addFavorite, getFavorites } from "@/utils/api";
import { renderDescription } from "@/utils/util";
import { FaHeart } from "react-icons/fa";
import { Item } from "@/interfaces/item";
import UserProfileHeader from "./UserProfileHeader";

const ListItem = styled.li`
  background: white;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ItemImageWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const ItemContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ItemFooter = styled.div`
  margin-top: 10px;
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

type ItemCardProps = {
  item: Item;
  isFavorite: boolean;
  setFavoriteIds: (ids: number[]) => void;
};

export default function ItemCard({
  item,
  isFavorite,
  setFavoriteIds,
}: ItemCardProps) {
  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(item.id);
    } else {
      await addFavorite(item.id);
    }
    setFavoriteIds(await getFavorites());
  };

  return (
    <ListItem>
      <UserProfileHeader avatar={item.avatar} userName={item.userName} /> 

      <ItemContent>
        <FooterDetails>
          <ItemName>{item.itemName}</ItemName>
          <ItemPrice>{`AED ${item.price}`}</ItemPrice>
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
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </ItemContent>

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
  );
}
