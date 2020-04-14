import React, { useEffect, useState } from "react";
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { IBuyPrice } from "./types";

interface IProps {
  defaultPrice?: IBuyPrice;
  isShowing: boolean;
  setIsShowing: any;
  handleFormSubmit: (newTurnipPrice: IBuyPrice) => void;
  handleFormClose?: () => void;
}

export const AddBuyPriceForm: React.FC<IProps> = ({
  defaultPrice,
  handleFormSubmit,
  isShowing,
  setIsShowing,
  handleFormClose = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(new Date());

  const theme = useTheme();

  useEffect(() => {
    if (isShowing === false) {
      reset();
      handleFormClose();
    }
  }, [isShowing]);

  useEffect(() => {
    if (defaultPrice && isShowing === true) {
      setId(defaultPrice.id || "");
      setPrice(defaultPrice.price);
      setDate(new Date(defaultPrice.date));
    }
  }, [defaultPrice, isShowing]);

  function reset() {
    setId("");
    setPrice(0);
    setDate(new Date());
    setIsShowing(false);
  }

  function handleSubmit() {
    if (price) {
      setIsLoading(true);
      try {
        handleFormSubmit({ id, price, date });
        reset();
      } catch (err) {
        console.log("error creating turnip price:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <Portal>
      <Dialog visible={isShowing} onDismiss={() => reset()}>
        <Dialog.Title>Add Buy Price</Dialog.Title>
        <Dialog.Content>
          <TextInput
            keyboardType={"numeric"}
            onChangeText={(val) => {
              setPrice(Number(val));
            }}
            textContentType={"oneTimeCode"}
            value={price !== 0 ? String(price) : undefined}
            placeholder="Price"
            label="Price"
          />

          <DateTimePicker
            value={date}
            onChange={(event, newDate) => {
              if (newDate) {
                setDate(newDate);
              }
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color={theme.colors.error}
            disabled={isLoading}
            onPress={() => setIsShowing(false)}
          >
            Cancel
          </Button>
          <Button
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
