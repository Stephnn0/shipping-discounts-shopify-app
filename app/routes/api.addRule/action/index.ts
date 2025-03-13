import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  createDiscountRule,
  DiscountRule,
} from "app/models/rules/rules.server";
import { createShippingDiscount } from "app/models/shopify/discounts.server";
import { authenticate } from "app/shopify.server";
import db from "app/db.server";

export default async function action({ request }: ActionFunctionArgs) {
  const context = await authenticate.admin(request);

  const formData = await request.formData();

  const body = formData.get("body") as string;

  const parsedBody = JSON.parse(body) as DiscountRule;

  console.log("parse body", JSON.stringify(parsedBody, null, 2));

  try {
    if (request.method === "POST") {
      const data: Parameters<typeof createDiscountRule>[0]["data"] = {
        shop: context.session.shop,
        ruleEnabled: parsedBody?.ruleEnabled ?? true,
        automaticOrCode: parsedBody?.automaticOrCode ?? "CODE",
        code: parsedBody?.code ?? "",
        discountType: parsedBody?.discountType || "PERCENTAGE",
        discountAmount: parsedBody?.discountAmount ?? "0",
        shippingRateOption: parsedBody?.shippingRateOption ?? "ALL_RATES",
        shippingRateName: parsedBody?.shippingRateName ?? "",
        startDate: parsedBody?.startDate ?? "",
        startTime: parsedBody?.startTime ?? "",
        hasEndDate: parsedBody?.hasEndDate ?? false,
        endDate: parsedBody?.endDate ?? "",
        endTime: parsedBody?.endTime ?? "",
      };

      const [shippingDiscount] = await Promise.all([
        createDiscountRule({ data }, db),
        createShippingDiscount(context.admin.graphql, parsedBody!.code, body),
      ]);

      return json({ payload: shippingDiscount });
    }
    if (request.method === "PUT") {
    }
    if (request.method === "DELETE") {
    }
  } catch (error) {
    console.log(error);
  }
}
