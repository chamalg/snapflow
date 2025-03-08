import Image from "next/image";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const UserName = styled.span`
  color: steelblue;
  font-weight: bold;
`;

const UserImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

type UserProfileHeaderProps = {
  avatar: string;
  userName: string;
};

const UserProfileHeader = ({ avatar, userName }: UserProfileHeaderProps) => {
  return (
    <HeaderWrapper>
      <UserImageWrapper>
        <Image src={avatar} alt={userName} width={40} height={40} />
      </UserImageWrapper>
      <UserName>{userName}</UserName>
    </HeaderWrapper>
  );
};

export default UserProfileHeader;
