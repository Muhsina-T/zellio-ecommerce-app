import { useContext } from "react";

import {
  ReturnContext,
} from "../context/ReturnContext";

export default function useReturn() {

  const context =
    useContext(ReturnContext);

  if (!context) {

    throw new Error(
      "useReturn must be used inside ReturnProvider"
    );

  }

  return context;
}