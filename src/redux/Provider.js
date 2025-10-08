"use client";

import { Provider } from "react-redux";
import Store from "@/redux/StoreListData";
import { useRef } from "react";
export default function Providers({ children }) {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    storeRef.current = Store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
