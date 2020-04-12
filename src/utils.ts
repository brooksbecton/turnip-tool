import { API, graphqlOperation } from "aws-amplify";

import {
  createTurnipPrice as createTurnipPriceMut,
  deleteTurnipPrice as deleteTurnipPriceMut,
  updateTurnipPrice as updateTurnipPriceMut,
  createSundayTurnip as createSundayTurnipMut,
  deleteSundayTurnip as deleteSundayTurnipMut,
  updateSundayTurnip as updateSundayTurnipMut,
} from "./graphql/mutations";
import { listTurnipPrices, listSundayTurnips } from "./graphql/queries";
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

export function isSellPrice(
  price: IBuyPrice | ISellPrice
): price is ISellPrice {
  return (price as ISellPrice).amPrice !== undefined;
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

export async function deleteSellPrice(newTurnipPrice: ISellPrice) {
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

// Buy

export async function addBuyPrice(buyPrice: IBuyPrice) {
  try {
    const data = await API.graphql(
      graphqlOperation(createSundayTurnipMut, { input: buyPrice })
    );
    console.log(data)
    //@ts-ignore
    return data.data.createSundayTurnip;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBuyPrice(buyPrice: IBuyPrice) {
  try {
    await API.graphql(
      graphqlOperation(deleteSundayTurnipMut, {
        input: { id: buyPrice.id },
      })
    );
  } catch (err) {
    console.log("error deleting turnip price:", err);
  }
}

export async function getBuyPrices() {
  const turnipData = await API.graphql(graphqlOperation(listSundayTurnips));
  //@ts-ignore
  return turnipData.data.listSundayTurnips.items;
}

export async function updateBuyPrice(buyPrice: IBuyPrice) {
  try {
    const turnipData = await API.graphql(
      graphqlOperation(updateSundayTurnipMut, { input: buyPrice })
    );
    //@ts-ignore
    return turnipData.data.updateSundayTurnip;
  } catch (err) {
    console.log("error updating turnipPrices", err);
  }
}
