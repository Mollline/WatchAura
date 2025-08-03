"use client";

import { BasketProvider } from "@/context/basletContext";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <BasketProvider>{children}</BasketProvider>;
}
