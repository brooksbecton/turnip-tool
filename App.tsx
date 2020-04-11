import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  DatePickerIOS,
} from "react-native";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify from "aws-amplify";

import { API, graphqlOperation } from "aws-amplify";
import { createTurnipPrice } from "./src/graphql/mutations";
import { listTurnipPrices } from "./src/graphql/queries";
import config from "./aws-exports";

Amplify.configure(config);

interface ITurnipPrice {
  id?: string;
  price: number;
  dateAdded: number;
}

const initialState: ITurnipPrice = {
  price: 0  ,
  dateAdded: new Date().getTime(),
};

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [turnipPrices, setTurnipPrices] = useState<ITurnipPrice[]>([]);

  useEffect(() => {
    fetchTurnipPrices();
  }, []);

  function setInput(key: string, value: any) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTurnipPrices() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTurnipPrices));
      //@ts-ignore
      const todos = todoData.data.listTurnipPrices.items;
      setTurnipPrices(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTurnipPrice() {
    try {
      const turnipPrice = { ...formState };
      setTurnipPrices([...turnipPrices, turnipPrice]);
      setFormState(initialState);
      await API.graphql(
        graphqlOperation(createTurnipPrice, { input: turnipPrice })
      );
    } catch (err) {
      console.log("error creating turnip price:", err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(val) => setInput("price", val)}
        style={styles.input}
        value={String(formState.price)}
        placeholder="Price"
      />

      <DatePickerIOS
        date={new Date(formState.dateAdded)}
        onDateChange={(newDate) => setInput("dateAdded", newDate)}
      />
      <Button title="Create Turnip Price" onPress={addTurnipPrice} />
      {turnipPrices.map((turnipPrice, index) => (
        <View key={turnipPrice.id ? turnipPrice.id : index} style={styles.todo}>
          <Text style={styles.todoName}>{turnipPrice.price} Bells</Text>
          <Text>{turnipPrice.dateAdded}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  todo: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 },
});

export default withAuthenticator(App);
