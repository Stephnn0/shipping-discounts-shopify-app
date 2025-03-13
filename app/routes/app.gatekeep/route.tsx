import { Page, Card, EmptyState } from "@shopify/polaris";
import { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";
import image from "app/assets/sad.svg";

export { loader };

export default function GateKeep() {
  const loaderPayload = useLoaderData<typeof loader>();

  console.log("loaderPayload", loaderPayload?.payload.code);

  return (
    <Page>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card padding={"1000"}>
          <EmptyState
            heading="You need to upgrade your plan to use this feature"
            action={{ content: "Upgrade plan" }}
            secondaryAction={{
              content: "Go back",
              url: "/app",
            }}
            image={image}
          >
            <br />
            <p>Enjoy 14 days of our free plan</p>
          </EmptyState>
        </Card>
      </div>
    </Page>
  );
}
