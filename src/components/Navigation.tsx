"use client";
import Link from 'next/link';
import styled from 'styled-components';
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

  bottom: 0; /* Default for mobile */

  @media (min-width: 768px) {
    top: 0; /* Move to top on desktop */
    bottom: unset;
    justify-content: flex-start;
    padding: 10px 20px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  @media (min-width: 768px) {
    width: auto;
    height: auto;
    margin-right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: white;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <NavItem href="/"><FaHome color="white" size="24px"/></NavItem>
      <NavItem href="/favorites"><FaHeart color="white" size="24px"/></NavItem>
    </Nav>
  );
}
