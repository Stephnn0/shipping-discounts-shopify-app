export const GRAPHQL_MUTATION_CREATE_DISCOUNT = `#graphql
  mutation discountCodeAppCreate(
   $functionId: String!
   $title: String!
   $startsAt: DateTime!
   $code: String!
   $metafields: [MetafieldInput!]!
  ) {
    discountCodeAppCreate(
      codeAppDiscount: {
        functionId: $functionId
        title: $title
        startsAt: $startsAt
        code: $code
        metafields: $metafields
      }
    ) {
      codeAppDiscount {
        discountId
      }
      userErrors {
        message
      }
    }
  }
`;
