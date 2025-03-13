import { CalloutCard } from "@shopify/polaris";
import image from "app/assets/d.png";

const PUBLIC_ENV = {
  VITE_SHOPIFY_APP_HANDLE: "shipping-discounts-14",
};

export function Billing() {
  return (
    <CalloutCard
      title="Subscribe to a plan"
      illustration={image}
      primaryAction={{
        content: "Choose a Plan",
        url: `shopify://admin/charges/${PUBLIC_ENV.VITE_SHOPIFY_APP_HANDLE}/pricing_plans`,
      }}
    >
      <p>You need to subscribe to enjoy our services</p>
    </CalloutCard>
  );
}
