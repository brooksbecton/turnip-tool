import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  DatePickerIOS,
  ScrollView,
} from "react-native";
import {
  Appbar,
  Card,
  Dialog,
  Portal,
  Button,
  TextInput,
} from "react-native-paper";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";
import { Provider as PaperProvider } from "react-native-paper";

import { API, graphqlOperation } from "aws-amplify";
import { createTurnipPrice } from "./src/graphql/mutations";
import { listTurnipPrices } from "./src/graphql/queries";
import config from "./aws-exports";

Amplify.configure(config);

interface ITurnipPrice {
  id?: string;
  price: number;
  dateAdded: Date;
}

const TurnipPriceList: React.FC<{ turnipPrices: ITurnipPrice[] }> = ({
  turnipPrices,
}) => {
  return (
    <ScrollView>
      {turnipPrices.map((turnipPrice, index) => (
        <Card
          style={{ marginBottom: 16 }}
          key={turnipPrice.id ? turnipPrice.id : index}
        >
          <Card.Content>
            <Text>{turnipPrice.price} Bells</Text>
            <Text>{new Date(turnipPrice.dateAdded).toISOString()}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const AddTurnipPriceForm: React.FC<{
  addTurnipPrice: (newTurnipPrice: ITurnipPrice) => Promise<any>;
}> = ({ addTurnipPrice }) => {
  const initialState: ITurnipPrice = {
    price: 0,
    dateAdded: new Date(),
  };
  const [formState, setFormState] = useState(initialState);

  function setInput(key: string, value: any) {
    setFormState({ ...formState, [key]: value });
  }

  async function handleSubmit() {
    try {
      const turnipPrice = { ...formState };
      setFormState(initialState);
      await addTurnipPrice(turnipPrice);
    } catch (err) {
      console.log("error creating turnip price:", err);
    }
  }

  return (
    <>
      <TextInput
        onChangeText={(val) => {
          setInput("price", val);
          // Default to current time
          setInput("dateAdded", new Date().toISOString());
        }}
        value={String(formState.price)}
        placeholder="Price"
      />

      <Button onPress={handleSubmit}>Create Turnip Price</Button>
    </>
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

  return (
    <PaperProvider>
      <Appbar>
        <Appbar.Action icon="plus" onPress={() => setIsShowingAddForm(true)} />
      </Appbar>
      <Portal>
        <Dialog
          visible={isShowingAddForm}
          onDismiss={() => setIsShowingAddForm(false)}
        >
          <Dialog.Title>Add new turnip price</Dialog.Title>
          <Dialog.Content>
            <AddTurnipPriceForm addTurnipPrice={addTurnipPrice} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsShowingAddForm(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={{
          backgroundColor: "#EEEEEE",
          padding: 18,
          flex: 1,
        }}
      >
        <TurnipPriceList turnipPrices={turnipPrices} />
      </View>
    </PaperProvider>
  );
};

export default withAuthenticator(App);
