import { Divider, Page, PageActions } from "@shopify/polaris";
import { useRuleForm } from "./hooks";
import DiscountSettings from "./components/DiscountSettings";
import ShippingRates from "./components/ShipppingRates";
import DateSelector from "./components/DateSelector";
import { AppBridgeSaveBar } from "app/components/AppBridgeSaveBar";

export default function Rule() {
  const form = useRuleForm();

  return (
    <>
      <Page title="Add Rule" backAction={{ url: "/app" }}>
        <DiscountSettings form={form} />
        <br />
        <br />
        <Divider />

        <ShippingRates form={form} />

        <br />
        <br />
        <Divider />
        <DateSelector form={form} />
        <PageActions
          primaryAction={{
            content: "Save",
            onAction: form.submit,
            disabled: !form.dirty,
          }}
        />
      </Page>
      <AppBridgeSaveBar
        onDiscard={form.reset}
        onSave={form.submit}
        open={form.dirty}
      />
    </>
  );
}
