"use client";
import Link from "next/link";
import styled from "styled-components";
import { FaHome, FaHeart } from "react-icons/fa";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: pink;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled(Link)`
  font-size: 24px;
  color: black;
`;

export default function Navigation() {
  return (
    <Nav>
      <NavItem href="/">
        <FaHome color="white" />
      </NavItem>
      <NavItem href="/favorites">
        <FaHeart color="white" />
      </NavItem>
    </Nav>
  );
}
