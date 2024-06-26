import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { SidebarMenuProps } from "./types";

export const MenuIconOpen = styled(NavLink)`
  display: flex;
  justify-content: start;
  font-size: 1.5rem;
  margin-left: 2rem;
  color: #3997ff;
`;

export const MenuIconClose = styled(NavLink)`
  display: flex;
  justify-content: end;
  font-size: 1.5rem;
  margin-top: 0.75rem;
  margin-right: 1rem;
  color: #3997ff;
`;

export const SidebarMenu = styled.div<SidebarMenuProps>(({ close, theme }) => ({
  height: "100vh",
  backgroundColor: theme.background,
  top: "0",
  width: close ? "165px" : "50px",
  transition: "0.6s",
}));

export const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const MenuItemLinks = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 20px;
  text-decoration: none;
  color: #6f6c99;
  padding: 5px 18px;
  height: 40px;

  &:hover {
    /* background-color: #ffffff; */
    /* color: #3997ff; */
    text-decoration: none;
    /* width: 100%;
    height: 45px;
    text-align: center;
    border-radius: 5px;
    margin: 0 2rem; */
  }
  span {
    white-space: nowrap;
    font-size: 13px;
    /* margin-top: 9px; */
    padding-left: 10px;
    font-family: "Helvetica-NeueL-Title";
    font-weight: 700 !important;
  }

  a.active span {
    color: #3997ff !important;
  }
`;
