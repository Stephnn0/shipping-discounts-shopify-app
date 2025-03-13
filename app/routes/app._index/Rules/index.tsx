import { useFetcher } from "@remix-run/react";
import { LegacyCard, Text, EmptyState, Badge, Card } from "@shopify/polaris";
import type { loader } from "app/routes/api.addRule/route";
import { useEffect, useState } from "react";
import image from "/app/assets/sad.svg";

type UseFetcherLoadOptions = {
  load?: boolean;
  retry?: boolean;
};

export function useFetcherLoad<T>(
  url: string,
  { load, retry }: UseFetcherLoadOptions = { load: true },
) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const fetcher = useFetcher<T>();

  useEffect(() => {
    if (load && (!hasLoaded || retry)) {
      fetcher.load(url);
      setHasLoaded(true);
    }
  }, [fetcher, hasLoaded, retry, load, url]);
  return fetcher;
}

export function Rules() {
  const initialData = useFetcherLoad<typeof loader>("/api/addRule");

  const rules = initialData.data?.payload ?? [];

  const enabledRules = rules.filter((rule) => rule.ruleEnabled);
  const disabledRules = rules.filter((rule) => !rule.ruleEnabled);

  return (
    <LegacyCard>
      {rules.length > 0 ? (
        <Card padding="1000">
          <Text as="h2" fontWeight="bold">
            Your Shipping Discount Rules
          </Text>

          <br />
          <Text as="h3" variant="bodyMd" fontWeight="bold">
            Enabled Rules
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "10px",
            }}
          >
            {enabledRules.map((rule) => (
              <div key={rule.code} style={{ padding: "10px" }}>
                <Badge
                  tone="success"
                  progress="complete" // Show progress as complete for enabled rules
                >
                  {rule.code}
                </Badge>
              </div>
            ))}
          </div>

          <br />
          <Text as="h3" variant="bodyMd" fontWeight="bold">
            Disabled Rules
          </Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "10px",
            }}
          >
            {disabledRules.map((rule) => (
              <div key={rule.code} style={{ padding: "10px" }}>
                <Badge
                  tone="critical"
                  progress="incomplete" // Show progress as incomplete for disabled rules
                >
                  {rule.code}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          heading="You have no shipping discount rules yet!"
          action={{ content: "Go to Rules" }}
          image={image}
        >
          <p>Add powerful rules to your shipping rates.</p>
        </EmptyState>
      )}
    </LegacyCard>
  );
}

// OPEN_APP_PLANS_PAGE: () =>
//   open(`shopify://admin/charges/${PUBLIC_ENV.VITE_SHOPIFY_APP_HANDLE}/pricing_plans`, '_top'),
