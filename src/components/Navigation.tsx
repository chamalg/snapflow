"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { FaHome, FaHeart } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  position: fixed;
  width: 100%;
  background: pink;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  /* Bottom nav on mobile */
  bottom: 0;

  @media (min-width: 768px) {
    /* Move to top for desktop */
    top: 0;
    bottom: auto;
  }
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.7)")};
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.3)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  /* Mobile view*/
  span {
    display: none;
  }

  @media (min-width: 768px) {
    /* Desktop view*/
    span {
      display: inline;
    }
    svg {
      display: none;
    }
  }
`;

export default function Navigation() {
  const pathname = usePathname();
  return (
    <Nav>
      <NavItem href="/" $active={pathname === "/"}>
        <FaHome size="24px" />
        <span>Home</span>
      </NavItem>
      <NavItem href="/favorites" $active={pathname === "/favorites"}>
        <FaHeart size="24px" />
        <span>Liked</span>
      </NavItem>
    </Nav>
  );
}
