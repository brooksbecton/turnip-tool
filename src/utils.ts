import { API, graphqlOperation } from "aws-amplify";

import {
  createTurnipPrice as createTurnipPriceMut,
  deleteTurnipPrice as deleteTurnipPriceMut,
  updateTurnipPrice as updateTurnipPriceMut,
  createSundayTurnip as createSundayTurnipMut,
} from "./graphql/mutations";
import { listTurnipPrices } from "./graphql/queries";
import { ISellPrice, IBuyPrice } from "./types";

export function getDayOfWeek(date: Date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

export function formatDate(date: Date) {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

// Sell

export async function addSellPrice(
  newTurnipPrice: ISellPrice
): Promise<ISellPrice> {
  const data = await API.graphql(
    graphqlOperation(createTurnipPriceMut, { input: newTurnipPrice })
  );
  //@ts-ignore
  return data.data.createTurnipPrice;
}

export async function deleteTurnipPrice(newTurnipPrice: ISellPrice) {
  try {
    await API.graphql(
      graphqlOperation(deleteTurnipPriceMut, {
        input: { id: newTurnipPrice.id },
      })
    );
  } catch (err) {
    console.log("error deleting turnip price:", err);
  }
}

export async function getSellPrices() {
  const turnipData = await API.graphql(graphqlOperation(listTurnipPrices));
  //@ts-ignore
  return turnipData.data.listTurnipPrices.items;
}
export async function updateTurnipPrice(newTurnipPrice: ISellPrice) {
  try {
    const turnipData = await API.graphql(
      graphqlOperation(updateTurnipPriceMut, { input: newTurnipPrice })
    );
    //@ts-ignore
    return turnipData.data.updateTurnipPrice;
  } catch (err) {
    console.log("error updating turnipPrices", err);
  }
}
