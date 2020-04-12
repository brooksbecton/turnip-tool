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
      date
      amPrice
      pmPrice
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
      date
      amPrice
      pmPrice
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
      date
      amPrice
      pmPrice
    }
  }
`;
export const createSundayTurnip = /* GraphQL */ `
  mutation CreateSundayTurnip(
    $input: CreateSundayTurnipInput!
    $condition: ModelSundayTurnipConditionInput
  ) {
    createSundayTurnip(input: $input, condition: $condition) {
      id
      date
      price
    }
  }
`;
export const updateSundayTurnip = /* GraphQL */ `
  mutation UpdateSundayTurnip(
    $input: UpdateSundayTurnipInput!
    $condition: ModelSundayTurnipConditionInput
  ) {
    updateSundayTurnip(input: $input, condition: $condition) {
      id
      date
      price
    }
  }
`;
export const deleteSundayTurnip = /* GraphQL */ `
  mutation DeleteSundayTurnip(
    $input: DeleteSundayTurnipInput!
    $condition: ModelSundayTurnipConditionInput
  ) {
    deleteSundayTurnip(input: $input, condition: $condition) {
      id
      date
      price
    }
  }
`;
