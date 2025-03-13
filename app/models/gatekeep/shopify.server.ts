import { AdminGraphqlClient } from "@shopify/shopify-app-remix/server";
import { GRAPHQL_QUERY_SHOP_INFO } from "./graphql";

export async function getShopInfo(graphql: AdminGraphqlClient) {
  try {
    const variables = {
      appURLMetafieldKey: "app_url",
      appENVMetafieldNamespace: "$app:env",
    };

    const response = await graphql(GRAPHQL_QUERY_SHOP_INFO, { variables });

    const data = await response.json();

    console.log(data.data, "shop info");
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
