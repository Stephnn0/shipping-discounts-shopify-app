import { useCallback, useState } from "react";
import { RuleForm } from "../hooks";
import {
  InlineGrid,
  Layout,
  Text,
  Card,
  Box,
  Checkbox,
  Tabs,
  TextField,
  Divider,
  Select,
} from "@shopify/polaris";

type DiscountSettingsProp = {
  form: RuleForm;
};

export default function DiscountSettings({ form }: DiscountSettingsProp) {
  const [selected, setSelected] = useState(0);
  const [selectedDiscountType, setSelectedDiscountType] = useState("");

  const { fields } = form;

  const { ruleEnabled, automaticOrCode, code, discountType, discountAmount } =
    fields;

  const handleTabChanged = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      const automaticOrCodeValue =
        selectedTabIndex === 0 ? "AUTOMATIC" : "CODE";
      automaticOrCode.onChange(automaticOrCodeValue);
    },
    [automaticOrCode],
  );

  const handleSelectedChangeDiscountTypeValue = useCallback(
    (value: string) => {
      discountType.onChange(value);
      setSelectedDiscountType(value);
    },
    [discountType],
  );

  return (
    <InlineGrid columns={{ xs: 1, sm: 1, md: ["oneThird", "twoThirds"] }}>
      <Layout>
        <Layout.Section>
          <Text as="h1" fontWeight="bold">
            Discount Settings
          </Text>

          <p>Define your discount settings and discount amount</p>
        </Layout.Section>
      </Layout>

      <Layout>
        <Box maxWidth="600px" width="100%">
          <Card padding="500">
            <Layout.Section>
              <Card>
                <InlineGrid columns={2}>
                  <Checkbox
                    label="Rule is Enabled"
                    checked={ruleEnabled.value}
                    onChange={(checked) => ruleEnabled.onChange(checked)}
                  />
                </InlineGrid>
              </Card>
            </Layout.Section>

            <Layout.Section>
              <p>Method</p>

              <Tabs
                tabs={[
                  {
                    id: "atomatic-discount-tab",
                    content: "Automatic Discount",
                  },
                  {
                    id: "discount-code-tab",
                    content: "Discount Code",
                  },
                ]}
                fitted
                selected={selected}
                onSelect={handleTabChanged}
              >
                {selected === 0 ? (
                  <>
                    <TextField
                      placeholder="Enter Discount Name"
                      label="Enter Discount Name"
                      autoComplete="off"
                      {...code}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      placeholder="Enter Discount Code"
                      label="Enter Discount Code"
                      autoComplete="off"
                      {...code}
                    />
                  </>
                )}
              </Tabs>
            </Layout.Section>
            <Divider />

            <Layout.Section>
              <InlineGrid columns={2}>
                <Select
                  label="Discount Value"
                  options={[
                    { label: "Percentage", value: "PERCENTAGE" },
                    { label: "Fixed Amount off", value: "FIXED-AMOUNT-OFF" },
                  ]}
                  onChange={handleSelectedChangeDiscountTypeValue}
                  value={selectedDiscountType}
                />
                <div style={{ paddingLeft: "10px", paddingTop: "3px" }}>
                  <br />
                  <TextField
                    label=""
                    autoComplete=""
                    value={discountAmount.value}
                    onChange={(value) => discountAmount.onChange(value)}
                  />
                </div>
              </InlineGrid>
            </Layout.Section>
          </Card>
        </Box>
      </Layout>
    </InlineGrid>
  );
}
