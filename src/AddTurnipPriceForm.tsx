import React, { useEffect, useState } from "react";
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  Chip,
  useTheme,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ISellPrice } from "./types";
import { formatDate } from "./utils";

interface IProps {
  defaultTurnipPrice: ISellPrice | undefined;
  isShowingAddForm: boolean;
  setIsShowingAddForm: any;
  handleFormSubmit: (newTurnipPrice: ISellPrice) => void;
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
  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (isShowingAddForm === false) {
      reset();
      handleFormClose();
    }
  }, [isShowingAddForm]);

  useEffect(() => {
    if (defaultTurnipPrice && isShowingAddForm === true) {
      setId(defaultTurnipPrice.id || "");
      setAmPrice(defaultTurnipPrice.amPrice);
      setPmPrice(defaultTurnipPrice.pmPrice);
      setDate(new Date(defaultTurnipPrice.date));
    }
  }, [defaultTurnipPrice, isShowingAddForm]);

  function reset() {
    setId("");
    setAmPrice(0);
    setPmPrice(0);
    setDate(new Date());
    setIsShowingAddForm(false);
    setIsShowingDatePicker(false);
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
            style={{ marginBottom: 18 }}
          />

          <Chip onPress={() => setIsShowingDatePicker(true)} icon={"calendar"}>
            {formatDate(date)}
          </Chip>

          {isShowingDatePicker && (
            <DateTimePicker
              value={date}
              display="calendar"
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
