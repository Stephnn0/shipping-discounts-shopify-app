import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getDiscountRules } from "app/models/rules/rules.server";
import { authenticate } from "app/shopify.server";
import db from "app/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("------------loader-----------");
  const { session } = await authenticate.admin(request);

  console.log(session.shop);
  try {
    const discountRules = await getDiscountRules(
      {
        where: {
          shop: session.shop,
        },
      },
      db,
    );

    return json({
      payload: discountRules,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
