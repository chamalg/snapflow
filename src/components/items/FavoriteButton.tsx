import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

type FavoriteButtonProps = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export default function FavoriteButton({
  isFavorite,
  toggleFavorite,
}: FavoriteButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (isProcessing) return; 
    setIsProcessing(true);
    await toggleFavorite(); 
    setIsProcessing(false); 
  };

  return (
    <Button onClick={handleClick} disabled={isProcessing}>
      <FaHeart
        color={isFavorite ? "#FF3B30" : "#A0A0A0"}
        style={{ filter: "drop-shadow(0px 0px 2px white)" }}
      />
    </Button>
  );
}
