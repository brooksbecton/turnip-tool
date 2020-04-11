import React, { useState } from "react";
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";

import { ITurnipPrice } from "./types";

interface IProps {
  isShowingAddForm: boolean;
  setIsShowingAddForm: any;
  addTurnipPrice: (newTurnipPrice: ITurnipPrice) => Promise<any>;
}

export const AddTurnipPriceForm: React.FC<IProps> = ({
  addTurnipPrice,
  isShowingAddForm,
  setIsShowingAddForm,
}) => {
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
