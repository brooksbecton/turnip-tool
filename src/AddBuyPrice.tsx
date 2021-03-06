import React, { useEffect, useState } from "react";
import {
  Chip,
  Dialog,
  Portal,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { IBuyPrice } from "./types";
import { formatDate } from "./utils";

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
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());

  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false);
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
      setPrice(String(defaultPrice.price));
      setDate(new Date(defaultPrice.date));
    }
  }, [defaultPrice, isShowing]);

  function reset() {
    setId("");
    setPrice("");
    setDate(new Date());
    setIsShowing(false);
    setIsShowingDatePicker(false);
  }

  function handleSubmit() {
    if (price) {
      setIsLoading(true);
      try {
        handleFormSubmit({ id, price: Number(price), date });
        reset();
      } catch (err) {
        console.log("error creating turnip price:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }
  console.log(price);
  return (
    <Portal>
      <Dialog visible={isShowing} onDismiss={() => reset()}>
        <Dialog.Title>Add Buy Price</Dialog.Title>
        <Dialog.Content>
          <TextInput
            keyboardType={"numeric"}
            onChangeText={(val) => {
              setPrice(val);
            }}
            textContentType={"oneTimeCode"}
            value={String(price)}
            placeholder="Price"
            label="Price"
            style={{ marginBottom: 18 }}
          />

          <Chip onPress={() => setIsShowingDatePicker(true)} icon={"calendar"}>
            {formatDate(date)}
          </Chip>

          {isShowingDatePicker && (
            <DateTimePicker
              value={date}
              onChange={(event, newDate) => {
                setIsShowingDatePicker(false);
                if (newDate) {
                  setDate(newDate);
                }
              }}
            />
          )}
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
