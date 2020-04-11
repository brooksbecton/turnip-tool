import React, { useEffect, useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import {
  Appbar,
  Switch,
  Card,
  Dialog,
  Portal,
  Button,
  TextInput,
  IconButton,
  FAB,
  Chip,
  Text,
  useTheme,
} from "react-native-paper";
import { withAuthenticator } from "aws-amplify-react-native";
import Amplify, { Auth } from "aws-amplify";
import { Provider as PaperProvider } from "react-native-paper";

import { API, graphqlOperation } from "aws-amplify";
import { createTurnipPrice, deleteTurnipPrice } from "./src/graphql/mutations";
import { listTurnipPrices } from "./src/graphql/queries";
import config from "./aws-exports";

Amplify.configure(config);

function getDayOfWeek(date: Date) {
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

function formatDate(date: Date) {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

interface ITurnipPrice {
  id?: string;
  date: Date;
  amPrice: number;
  pmPrice: number;
}

const TurnipPriceList: React.FC<{
  turnipPrices: ITurnipPrice[];
  deleteTurnipPrice: (newTurnipPrice: ITurnipPrice) => Promise<any>;
}> = ({ deleteTurnipPrice, turnipPrices }) => {
  const theme = useTheme();

  return (
    <ScrollView>
      {turnipPrices.map((turnipPrice, index) => (
        <Card
          style={{ marginBottom: 16 }}
          key={turnipPrice.id ? turnipPrice.id : index}
        >
          <Card.Title
            title={getDayOfWeek(new Date(turnipPrice.date))}
            subtitle={formatDate(new Date(turnipPrice.date))}
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
          <Card.Content>
            <View
              style={{ justifyContent: "space-around", flexDirection: "row" }}
            >
              <Chip
                icon={() => (
                  <Text style={{ color: theme.colors.accent }}>AM</Text>
                )}
              >
                <Text>{`${turnipPrice.amPrice} Bells`}</Text>
              </Chip>

              <Chip
                icon={() => (
                  <Text style={{ color: theme.colors.accent }}>PM</Text>
                )}
              >
                <Text>{`${turnipPrice.pmPrice} Bells`}</Text>
              </Chip>
            </View>
          </Card.Content>
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
  const [amPrice, setAmPrice] = useState<number>(0);
  const [pmPrice, setPmPrice] = useState<number>(0);
  const [date] = useState(new Date());

  const theme = useTheme();

  async function handleSubmit() {
    if (amPrice && pmPrice) {
      setIsLoading(true);
      try {
        await addTurnipPrice({ amPrice, pmPrice, date });

        setIsShowingAddForm(false);
        setAmPrice(0);
        setPmPrice(0);
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
              const price = Number(val);
              setAmPrice(price);
            }}
            textContentType={"oneTimeCode"}
            value={amPrice !== 0 ? String(amPrice) : undefined}
            placeholder="AM Price"
          />
          <TextInput
            keyboardType={"numeric"}
            onChangeText={(val) => {
              const price = Number(val);

              setPmPrice(price);
            }}
            textContentType={"oneTimeCode"}
            value={pmPrice !== 0 ? String(pmPrice) : undefined}
            placeholder="PM Price"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color={theme.colors.error}
            disabled={isLoading}
            onPress={() => setIsShowingAddForm(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={amPrice === undefined && pmPrice === undefined}
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
