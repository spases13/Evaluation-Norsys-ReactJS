import { useEffect, useState } from "react";
import Logo from "./Logo";
import "./styles/SideBar.scss";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number | null>(null);

  const url = window.location.pathname;

  useEffect(() => {
    const newIndex = pathnameData.find((d: any) => d.pathname === url)?.index;
    setSelectedMenuIndex(newIndex ?? null);
  }, [url]);

  const pathnameData: any = [
    {
      index: 0,
      pathname: "/dashboard/books",
    },
    {
      index: 1,
      pathname: "/dashboard/users",
    },
    {
      index: 2,
      pathname: "/dashboard/reservations",
    },
    {
      index: 3,
      pathname: "/dashboard/about",
    },
  ];

  return (
    <div className="SideBar">
      <Logo />
      <ul className="menu_list">
        <SideBarItem
          href = {"/dashboard/books"}
          onClick={() => {
            setSelectedMenuIndex(0)
          }}
          labelName="Books"
          iconClassName="bx bx-book"
          selectedMenuIndex={selectedMenuIndex}
          index={0}
        />
        <SideBarItem
        href = {"/dashboard/users"}
          onClick={() => {
            setSelectedMenuIndex(1)
          }}
          labelName="Users"
          iconClassName="bx bx-user"
          selectedMenuIndex={selectedMenuIndex}
          index={1}
        />
        <SideBarItem
        href = {"/dashboard/reservations"}
          onClick={() => {
            setSelectedMenuIndex(2)
          }}
          labelName="Loans"
          iconClassName="bx bx-book-reader"
          selectedMenuIndex={selectedMenuIndex}
          index={2}
        />
        <SideBarItem
        href = {"/dashboard/about"}
          onClick={() => {
            setSelectedMenuIndex(3)
          }}
          labelName="About"
          iconClassName="bx bx-info-circle"
          selectedMenuIndex={selectedMenuIndex}
          index={3}
        />
      </ul>
    </div>
  );
};

export default SideBar;
