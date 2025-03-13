import { LoaderFunctionArgs } from "@remix-run/node";
import { gateKeepRoute } from "app/models/gatekeep/gatekeepRoute";
import { authenticate } from "app/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const context = await authenticate.admin(request);

  await gateKeepRoute({ authAdminContext: context }, "redirect", "Pro");
  return null;
};
