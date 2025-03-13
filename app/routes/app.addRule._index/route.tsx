import { Link, useLoaderData } from "@remix-run/react";
import {
  Page,
  Badge,
  Button,
  Card,
  IndexTable,
  useIndexResourceState,
  Text,
} from "@shopify/polaris";
import { loader } from "./loader";

export { loader };

export default function Rules() {
  const loaderData = useLoaderData<typeof loader>();

  const discountRules = loaderData?.payload?.map((data) => ({
    id: data.code,
    rule: data.code,
    startDate: new Date(data.startDate).toLocaleDateString(),
    discountType: data.discountType,
    discountAmount: data.discountAmount,
    shippingRateName: data.shippingRateName || "",
    shippingRateOption: data.shippingRateOption,
    status: data.ruleEnabled ? (
      <Badge progress="complete">Enabled</Badge>
    ) : (
      <Badge progress="incomplete">Disabled</Badge>
    ),
  }));

  const resourceName = {
    singular: "discount Rule",
    plural: "discount Rules",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(discountRules);

  const rowMarkup = discountRules?.map(
    (
      {
        id,
        rule,
        startDate,
        discountType,
        discountAmount,
        shippingRateOption,
        shippingRateName,
        status,
      },
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {" "}
            {rule}
          </Text>
        </IndexTable.Cell>

        <IndexTable.Cell>{startDate}</IndexTable.Cell>
        <IndexTable.Cell>{discountType}</IndexTable.Cell>
        <IndexTable.Cell>{discountAmount}</IndexTable.Cell>
        <IndexTable.Cell>{shippingRateOption}</IndexTable.Cell>
        <IndexTable.Cell>{shippingRateName}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Page
      title="Shipping Discount Rules"
      primaryAction={
        <Link to="new">
          <Button variant="primary">Create Shipping Discount</Button>
        </Link>
      }
    >
      <Card>
        <IndexTable
          resourceName={resourceName}
          itemCount={discountRules!.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Rule" },
            { title: "Start Date" },
            { title: "Discount Type" },
            { title: "Discount Amount" },
            { title: "Shipping Rate Option" },
            { title: "Shipping Rate Name" },
            { title: "status" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Page>
  );
}
