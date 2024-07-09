"use client";

import { useEffect, useState } from "react";

import { Header } from "./Components/Header";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
}
