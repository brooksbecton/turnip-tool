import React from "react";
import { View, ScrollView } from "react-native";
import { Card, IconButton, Chip, Text, useTheme } from "react-native-paper";
import moment from "moment";

import { ISellPrice, IBuyPrice } from "./types";
import { getDayOfWeek, formatDate, isSellPrice } from "./utils";

interface IProps {
  prices: Array<ISellPrice | IBuyPrice>;
  deleteTurnipPrice: (newTurnipPrice: ISellPrice | IBuyPrice) => void;
  onCardPress: (newTurnipPrice: ISellPrice | IBuyPrice) => void;
}

export const TurnipPriceList: React.FC<IProps> = ({
  onCardPress,
  deleteTurnipPrice,
  prices,
}) => {
  const theme = useTheme();
  const buyPrices = prices.filter((p) => {
    if (isSellPrice(p) === false) {
      return p;
    }
  });
  function getLastSunday(d: Date) {
    return moment(d).startOf("week").toDate();
  }
  function getLastSundayPrice(
    price: ISellPrice,
    prices: IBuyPrice[]
  ): IBuyPrice | undefined {
    const lastSundayDate = getLastSunday(price.date);
    return prices.find(
      (p) => moment(lastSundayDate).get("date") === moment(p.date).get("date")
    );
  }

  const BuyContent = ({ price }: { price: IBuyPrice }) => (
    <Chip>
      <Text>{`${price.price} Bells`}</Text>
    </Chip>
  );
  const SellContent = ({
    price,
  }: {
    price: ISellPrice;
    buyPrices: IBuyPrice[];
  }) => {
    const lastSundayPrice = getLastSundayPrice(price, buyPrices as IBuyPrice[]);
    console.log(lastSundayPrice);
    const amPriceDiff = lastSundayPrice?.price
      ? price.amPrice - lastSundayPrice?.price
      : 0;
    const pmPriceDiff = lastSundayPrice?.price
      ? price.pmPrice - lastSundayPrice?.price
      : 0;
    return (
      <>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>AM</Text>

          <Chip
            icon={() => (
              <Text
                style={{
                  color:
                    amPriceDiff >= 0 ? theme.colors.accent : theme.colors.error,
                }}
              >
                {`(${amPriceDiff})`}
              </Text>
            )}
          >
            <Text>{`${price.amPrice} Bells`}</Text>
          </Chip>
        </View>

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>PM</Text>

          <Chip
            icon={() => (
              <Text
                style={{
                  color:
                    pmPriceDiff >= 0 ? theme.colors.accent : theme.colors.error,
                }}
              >
                {`(${pmPriceDiff})`}
              </Text>
            )}
          >
            <Text>{`${price.pmPrice} Bells`}</Text>
          </Chip>
        </View>
      </>
    );
  };

  return (
    <ScrollView>
      {prices.map((turnipPrice, index) => (
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
                <SellContent
                  buyPrices={buyPrices as IBuyPrice[]}
                  price={turnipPrice as ISellPrice}
                />
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
