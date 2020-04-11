// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTurnipPrice = /* GraphQL */ `
  query GetTurnipPrice($id: ID!) {
    getTurnipPrice(id: $id) {
      id
      date
      amPrice
      pmPrice
    }
  }
`;
export const listTurnipPrices = /* GraphQL */ `
  query ListTurnipPrices(
    $filter: ModelTurnipPriceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTurnipPrices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        amPrice
        pmPrice
      }
      nextToken
    }
  }
`;
