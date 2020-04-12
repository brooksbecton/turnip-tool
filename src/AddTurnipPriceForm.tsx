import React, { useEffect, useState } from "react";
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  useTheme,
} from "react-native-paper";

import { ITurnipPrice } from "./types";

interface IProps {
  defaultTurnipPrice: ITurnipPrice | undefined;
  isShowingAddForm: boolean;
  setIsShowingAddForm: any;
  handleFormSubmit: (newTurnipPrice: ITurnipPrice) => void;
  handleFormClose: () => void;
}

export const AddTurnipPriceForm: React.FC<IProps> = ({
  defaultTurnipPrice,
  handleFormSubmit,
  isShowingAddForm,
  setIsShowingAddForm,
  handleFormClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [amPrice, setAmPrice] = useState<number>(0);
  const [pmPrice, setPmPrice] = useState<number>(0);
  const [date, setDate] = useState(new Date());

  const theme = useTheme();
  useEffect(() => {
    if (isShowingAddForm === false) {
      reset()
      handleFormClose();
    }
  }, [isShowingAddForm]);

  useEffect(() => {
    if (defaultTurnipPrice && isShowingAddForm === true) {
      setId(defaultTurnipPrice.id || "");
      setAmPrice(defaultTurnipPrice.amPrice);
      setPmPrice(defaultTurnipPrice.pmPrice);
      setDate(defaultTurnipPrice.date);
    }
  }, [defaultTurnipPrice, isShowingAddForm]);

  function reset() {
    setId("");
    setAmPrice(0);
    setPmPrice(0);
    setDate(new Date());
    setIsShowingAddForm(false);
  }

  function handleSubmit() {
    if (amPrice && pmPrice) {
      setIsLoading(true);
      try {
        handleFormSubmit({ id, amPrice, pmPrice, date });

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
      <Dialog visible={isShowingAddForm} onDismiss={() => reset()}>
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
            label="AM Price"
            style={{ marginBottom: 18 }}
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
            label="PM Price"
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