import type { LoaderFunctionArgs } from "@remix-run/node";
import { Page } from "@shopify/polaris";
import Dashboardcomponent from "app/components/Dashboardbanner";
import { authenticate } from "app/shopify.server";
import { Billing } from "./Billing";
import { Rules } from "./Rules";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export default function Index() {
  return (
    <Page>
      <Dashboardcomponent />
      <br />
      <Billing />
      <br />
      <Rules />
    </Page>
  );
}
