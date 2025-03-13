import { useCallback, useState } from "react";
import { RuleForm } from "../hooks";
import {
  InlineGrid,
  Layout,
  Text,
  Box,
  Card,
  Tabs,
  Badge,
  TextField,
} from "@shopify/polaris";

type ShippingRatesProp = {
  form: RuleForm;
};

export default function ShippingRates({ form }: ShippingRatesProp) {
  const [selectedShippingRateTab, setSelectedShippingRateTab] = useState(0);
  const { fields } = form;

  const shippingRateTabs = [
    {
      id: "by-rate-name",
      content: "By Rate Name",
    },
    {
      id: "all-rates",
      content: "All Rates",
    },
  ];
  const { shippingRateOption, shippingRateName } = fields;

  const handleTabChangeShippingRate = useCallback(
    (selectedTabIndex: number) => {
      const shippingRatesOptionValue =
        selectedTabIndex === 0 ? "BY_RATE_NAME" : "ALL_RATES";

      shippingRateOption.onChange(shippingRatesOptionValue);

      setSelectedShippingRateTab(selectedTabIndex);
    },
    [shippingRateOption],
  );

  return (
    <InlineGrid columns={{ xs: 1, sm: 1, md: ["oneThird", "twoThirds"] }}>
      <Layout>
        <Layout.Section>
          <Text as="h1" fontWeight="bold">
            Shipping Rates Selector
          </Text>
          <p>
            Choose the shipping ratesthat you would like to be conneected based
            om conditions
          </p>
        </Layout.Section>
      </Layout>

      <Layout>
        <Box maxWidth="600px" width="100%">
          <Card padding="500">
            <p>Shipping Rate selector</p>
            <Tabs
              onSelect={handleTabChangeShippingRate}
              tabs={shippingRateTabs}
              selected={selectedShippingRateTab}
              fitted
            >
              {selectedShippingRateTab === 0 ? (
                <>
                  <TextField
                    placeholder="Shipping Rate Name"
                    label="Shipping Rate Name"
                    autoComplete="off"
                    {...shippingRateName}
                  />
                </>
              ) : (
                <>
                  <br />
                  <Badge progress="complete">
                    All shippping Rates will be discounted if required
                    conditions are satisfied
                  </Badge>
                </>
              )}
            </Tabs>
          </Card>
        </Box>
      </Layout>
    </InlineGrid>
  );
}
