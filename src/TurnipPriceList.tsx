import React from "react";
import { View, ScrollView } from "react-native";
import { Card, IconButton, Chip, Text, useTheme } from "react-native-paper";

import { ISellPrice, IBuyPrice } from "./types";
import { getDayOfWeek, formatDate, isSellPrice } from "./utils";

interface IProps {
  turnipPrices: Array<ISellPrice | IBuyPrice>;
  deleteTurnipPrice: (newTurnipPrice: ISellPrice | IBuyPrice) => void;
  onCardPress: (newTurnipPrice: ISellPrice | IBuyPrice) => void;
}

export const TurnipPriceList: React.FC<IProps> = ({
  onCardPress,
  deleteTurnipPrice,
  turnipPrices,
}) => {
  const theme = useTheme();

  const BuyContent = ({ price }: { price: IBuyPrice }) => (
    <Chip>
      <Text>{`${price.price} Bells`}</Text>
    </Chip>
  );
  const SellContent = ({ price }: { price: ISellPrice }) => (
    <>
      <Chip icon={() => <Text style={{ color: theme.colors.accent }}>AM</Text>}>
        <Text>{`${price.amPrice} Bells`}</Text>
      </Chip>

      <Chip icon={() => <Text style={{ color: theme.colors.accent }}>PM</Text>}>
        <Text>{`${price.pmPrice} Bells`}</Text>
      </Chip>
    </>
  );

  return (
    <ScrollView>
      {turnipPrices.map((turnipPrice, index) => (
        <Card
          onPress={() => {
            onCardPress(turnipPrice);
          }}
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
              {isSellPrice(turnipPrice) ? (
                <SellContent price={turnipPrice as ISellPrice} />
              ) : (
                <BuyContent price={turnipPrice as IBuyPrice} />
              )}
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};
