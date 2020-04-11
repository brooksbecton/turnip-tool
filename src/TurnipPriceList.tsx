import React from "react";
import { View, ScrollView } from "react-native";
import { Card, IconButton, Chip, Text, useTheme } from "react-native-paper";

import { ITurnipPrice } from "./types";
import { getDayOfWeek, formatDate } from "./utils";

interface IProps {
  turnipPrices: ITurnipPrice[];
  deleteTurnipPrice: (newTurnipPrice: ITurnipPrice) => Promise<any>;
  onCardPress: (newTurnipPrice: ITurnipPrice) => void;
}

export const TurnipPriceList: React.FC<IProps> = ({
  onCardPress,
  deleteTurnipPrice,
  turnipPrices,
}) => {
  const theme = useTheme();

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
