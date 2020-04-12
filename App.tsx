import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import {
  DefaultTheme,
  Appbar,
  FAB,
  useTheme,
  Portal,
} from "react-native-paper";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify, { Auth } from "aws-amplify";
import { Provider as PaperProvider } from "react-native-paper";

import { ISellPrice } from "./src/types";
import {
  addSellPrice,
  getSellPrices,
  updateTurnipPrice,
  deleteTurnipPrice,
} from "./src/utils";
import { AddTurnipPriceForm } from "./src/AddTurnipPriceForm";
import { TurnipPriceList } from "./src/TurnipPriceList";
import config from "./aws-exports";
import { AddBuyPriceForm } from "./src/AddBuyPrice";

Amplify.configure(config);

const App: React.FC = () => {
  const [sellPrices, setSellPrices] = useState<ISellPrice[]>([]);
  const [isShowingAddForm, setIsShowingAddForm] = useState(false);
  const [isShowingBuyForm, setIsShowingBuyForm] = useState(false);
  const [defaultTurnipPrice, setDefaultTurnipPrice] = useState<
    ISellPrice | undefined
  >();
  const [isFabOpen, setIsFabOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    getSellPrices().then((newSellPrices) => {
      setSellPrices(newSellPrices);
    });
  }, []);

  async function handleSellFormSubmit(turnipPrice: ISellPrice) {
    if (turnipPrice.id) {
      const updatedSellPrice = await updateTurnipPrice(turnipPrice);
      const updatedSellPrices = sellPrices.map((tP) => {
        if (tP.id === updatedSellPrice.id) {
          return updatedSellPrice;
        } else {
          return tP;
        }
      });
      setSellPrices(updatedSellPrices);
    } else {
      const newSellPrice = await addSellPrice(turnipPrice);

      setSellPrices([newSellPrice, ...sellPrices]);
    }
  }

  function handleSellFormClose() {
    setDefaultTurnipPrice({ amPrice: 0, pmPrice: 0, date: new Date() });
  }

  function handleCardPress(turnipPrice: ISellPrice) {
    setDefaultTurnipPrice(turnipPrice);
    setIsShowingAddForm(true);
  }

  function handleDelete(sellPrice: ISellPrice) {
    deleteTurnipPrice(sellPrice);

    setSellPrices(sellPrices.filter((sP) => sP.id !== sellPrice.id));
  }
  const defaultTheme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2e7d32",
      accent: "#2196f3",
    },
  };
  return (
    <PaperProvider theme={defaultTheme}>
      <StatusBar />
      <Appbar style={{ paddingTop: 18, justifyContent: "flex-end" }}>
        <Appbar.Action
          icon="logout"
          onPress={() => {
            Auth.signOut();
          }}
        />
      </Appbar>
      <AddTurnipPriceForm
        defaultTurnipPrice={defaultTurnipPrice}
        handleFormSubmit={handleSellFormSubmit}
        handleFormClose={handleSellFormClose}
        setIsShowingAddForm={setIsShowingAddForm}
        isShowingAddForm={isShowingAddForm}
      />
      <AddBuyPriceForm
        handleFormSubmit={() => {}}
        handleFormClose={() => {}}
        setIsShowing={setIsShowingBuyForm}
        isShowing={isShowingBuyForm}
      />
      <View
        style={{
          backgroundColor: theme.colors.background,
          padding: 18,
          flex: 1,
        }}
      >
        <TurnipPriceList
          onCardPress={handleCardPress}
          deleteTurnipPrice={handleDelete}
          turnipPrices={sellPrices}
        />

        <Portal>
          <FAB.Group
            visible={true}
            open={isFabOpen}
            onPress={() => setIsFabOpen(!isFabOpen)}
            onStateChange={() => {}}
            icon={isFabOpen ? "bell" : "plus"}
            actions={[
              {
                icon: "food-apple",
                label: "Add Turnip Buy Price",

                onPress: () => {
                  setIsShowingBuyForm(true);
                  setIsFabOpen(false);
                },
              },
              {
                icon: "account-supervisor",
                label: "Add Sell Price",
                onPress: () => {
                  setIsShowingAddForm(true);
                  setIsFabOpen(false);
                },
              },
            ]}
          />
        </Portal>
      </View>
    </PaperProvider>
  );
};

console.disableYellowBox = true;

export default withAuthenticator(App);
