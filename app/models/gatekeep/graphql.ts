export const GRAPHQL_QUERY_SHOP_INFO = `#graphql
  query ShopInfo($appURLMetafieldKey: String!, $appENVMetafieldNamespace: String!) {
    shop {
      plan {
        displayName
        partnerDevelopment
        shopifyPlus
      }
      ianaTimezone
      appURLMetafield: metafield(key: $appURLMetafieldKey, namespace: $appENVMetafieldNamespace) {
        key
        namespace
        value
        definition {
          access {
            admin
            customerAccount
            storefront
          }
        }
      }
    }
    checkoutProfiles(first: 1, query: "is_published:true") {
      nodes {
        id
      }
    }
    app {
      id
    }
    currentAppInstallation {
      activeSubscriptions {
        id
        trialDays
        name
        status
      }
    }
  }
`;
