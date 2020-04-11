// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTurnipPrice = /* GraphQL */ `
  mutation CreateTurnipPrice(
    $input: CreateTurnipPriceInput!
    $condition: ModelTurnipPriceConditionInput
  ) {
    createTurnipPrice(input: $input, condition: $condition) {
      id
      price
      dateAdded
    }
  }
`;
export const updateTurnipPrice = /* GraphQL */ `
  mutation UpdateTurnipPrice(
    $input: UpdateTurnipPriceInput!
    $condition: ModelTurnipPriceConditionInput
  ) {
    updateTurnipPrice(input: $input, condition: $condition) {
      id
      price
      dateAdded
    }
  }
`;
export const deleteTurnipPrice = /* GraphQL */ `
  mutation DeleteTurnipPrice(
    $input: DeleteTurnipPriceInput!
    $condition: ModelTurnipPriceConditionInput
  ) {
    deleteTurnipPrice(input: $input, condition: $condition) {
      id
      price
      dateAdded
    }
  }
`;
