import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import { Appbar, FAB, useTheme } from "react-native-paper";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify, { Auth } from "aws-amplify";
import { Provider as PaperProvider } from "react-native-paper";
import { API, graphqlOperation } from "aws-amplify";

import { ITurnipPrice } from "./src/types";
import { AddTurnipPriceForm } from "./src/AddTurnipPriceForm";
import { TurnipPriceList } from "./src/TurnipPriceList";
import { createTurnipPrice, deleteTurnipPrice } from "./src/graphql/mutations";
import { listTurnipPrices } from "./src/graphql/queries";
import config from "./aws-exports";

Amplify.configure(config);

const App: React.FC = () => {
  const [turnipPrices, setTurnipPrices] = useState<ITurnipPrice[]>([]);
  const [isShowingAddForm, setIsShowingAddForm] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    fetchTurnipPrices();
  }, []);

  async function addTurnipPrice(newTurnipPrice: ITurnipPrice) {
    try {
      await API.graphql(
        graphqlOperation(createTurnipPrice, { input: newTurnipPrice })
      );
      setTurnipPrices([newTurnipPrice, ...turnipPrices]);
    } catch (err) {
      console.log("error creating turnip price:", err);
    }
  }

  async function fetchDeleteTurnipPrice(newTurnipPrice: ITurnipPrice) {
    try {
      await API.graphql(
        graphqlOperation(deleteTurnipPrice, {
          input: { id: newTurnipPrice.id },
        })
      );
      setTurnipPrices(turnipPrices.filter((tP) => tP.id !== newTurnipPrice.id));
    } catch (err) {
      console.log("error deleting turnip price:", err);
    }
  }

  async function fetchTurnipPrices() {
    try {
      const turnipData = await API.graphql(graphqlOperation(listTurnipPrices));
      //@ts-ignore
      const turnipPrices = turnipData.data.listTurnipPrices.items;
      setTurnipPrices(turnipPrices);
    } catch (err) {
      console.log("error fetching turnipPrices");
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <PaperProvider>
      <StatusBar />
      <Appbar style={{ paddingTop: 18, justifyContent: "flex-end" }}>
        <Appbar.Action
          icon="logout"
          onPress={() => {
            signOut();
          }}
        />
      </Appbar>
      <AddTurnipPriceForm
        addTurnipPrice={addTurnipPrice}
        setIsShowingAddForm={setIsShowingAddForm}
        isShowingAddForm={isShowingAddForm}
      />
      <View
        style={{
          backgroundColor: theme.colors.background,
          padding: 18,
          flex: 1,
        }}
      >
        <TurnipPriceList
          deleteTurnipPrice={fetchDeleteTurnipPrice}
          turnipPrices={turnipPrices}
        />
        <FAB
          style={{
            position: "absolute",
            margin: 18,
            right: 0,
            bottom: 0,
          }}
          icon="plus"
          onPress={() => setIsShowingAddForm(true)}
        />
      </View>
    </PaperProvider>
  );
};

export default withAuthenticator(App);
