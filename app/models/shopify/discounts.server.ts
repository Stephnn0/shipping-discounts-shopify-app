import { AdminGraphqlClient } from "@shopify/shopify-app-remix/server";
import { GRAPHQL_MUTATION_CREATE_DISCOUNT } from "../graphql/discounts.shopify";

export async function createShippingDiscount(
  graphql: AdminGraphqlClient,
  code: string,
  body: string,
) {
  try {
    const VARIABLES = {
      functionId: "54373ff2-c586-4bfa-8809-5098a1c2246b",
      title: code,
      startsAt: "2025-03-11",
      code: code,
      metafields: {
        key: "app_discount",
        value: body,
        type: "string",
      },
    };

    const response = await graphql(GRAPHQL_MUTATION_CREATE_DISCOUNT, {
      variables: VARIABLES,
    });

    const { data: adminData } = await response.json();

    return adminData;
  } catch (error) {
    console.log(error);
  }
}
