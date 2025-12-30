"use client";

import SideMenu from "./side-menu";
import { memo } from "react";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <SideMenu />
      </nav>
    </>
  );
}

// Memoize navbar to prevent re-renders from parent
