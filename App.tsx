import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Appbar,
  Card,
  Dialog,
  Portal,
  Button,
  TextInput,
  IconButton,
  FAB,
} from "react-native-paper";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify, { Auth } from "aws-amplify";
import { Provider as PaperProvider } from "react-native-paper";

import { API, graphqlOperation } from "aws-amplify";
import { createTurnipPrice, deleteTurnipPrice } from "./src/graphql/mutations";
import { listTurnipPrices } from "./src/graphql/queries";
import config from "./aws-exports";

Amplify.configure(config);

interface ITurnipPrice {
  id?: string;
  price: number;
  dateAdded: Date;
}

const TurnipPriceList: React.FC<{
  turnipPrices: ITurnipPrice[];
  deleteTurnipPrice: (newTurnipPrice: ITurnipPrice) => Promise<any>;
}> = ({ deleteTurnipPrice, turnipPrices }) => {
  return (
    <ScrollView>
      {turnipPrices.map((turnipPrice, index) => (
        <Card
          style={{ marginBottom: 16 }}
          key={turnipPrice.id ? turnipPrice.id : index}
        >
          <Card.Title
            title={`${turnipPrice.price} Bells`}
            subtitle={new Date(turnipPrice.dateAdded).toISOString()}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                onPress={() => {
                  deleteTurnipPrice(turnipPrice);
                }}
              />
            )}
          />
        </Card>
      ))}
    </ScrollView>
  );
};

const AddTurnipPriceForm: React.FC<{
  isShowingAddForm: boolean;
  setIsShowingAddForm: any;
  addTurnipPrice: (newTurnipPrice: ITurnipPrice) => Promise<any>;
}> = ({ addTurnipPrice, isShowingAddForm, setIsShowingAddForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState<number | undefined>();
  const [date] = useState(new Date());

  async function handleSubmit() {
    if (price) {
      setIsLoading(true);
      try {
        await addTurnipPrice({ price, dateAdded: date });
        setIsShowingAddForm(false);
        setPrice(undefined);
      } catch (err) {
        console.log("error creating turnip price:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Portal>
      <Dialog
        visible={isShowingAddForm}
        onDismiss={() => setIsShowingAddForm(false)}
      >
        <Dialog.Title>Add New Turnip Price</Dialog.Title>
        <Dialog.Content>
          <TextInput
            keyboardType={"numeric"}
            onChangeText={(val) => {
              setPrice(Number(val));
            }}
            textContentType={"oneTimeCode"}
            value={price ? String(price) : undefined}
            placeholder="Price"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color={"red"}
            disabled={isLoading}
            onPress={() => setIsShowingAddForm(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={price === undefined}
            icon={"plus"}
            loading={isLoading}
            onPress={() => handleSubmit()}
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const App: React.FC = () => {
  const [turnipPrices, setTurnipPrices] = useState<ITurnipPrice[]>([]);
  const [isShowingAddForm, setIsShowingAddForm] = useState(false);

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
      console.log('success')
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
          backgroundColor: "#EEEEEE",
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
            margin: 16,
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
