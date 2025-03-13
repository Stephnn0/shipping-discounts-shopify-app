import { authenticate } from "app/shopify.server";
import { getShopInfo } from "./shopify.server";

type AuthAdminCOntext = Awaited<ReturnType<typeof authenticate.admin>>;

export async function gateKeepRoute(
  currentContext: { authAdminContext: AuthAdminCOntext },
  action: "redirect" | "throw",
  requiredPlan: string,
) {
  const { authAdminContext } = currentContext;

  const { admin } = authAdminContext;

  let redirectCode = null;

  try {
    const shopInfo = await getShopInfo(admin.graphql);

    if (!shopInfo) {
      redirectCode = "gatekeep";
    } else {
      const current = {
        activeSubscriptions:
          shopInfo.currentAppInstallation.activeSubscriptions,
      };

      console.log(JSON.stringify(current));

      redirectCode = gatekeep({ current, requiredPlan });
    }
  } catch (error) {
    redirectCode = "gatekeep";
  }
  if (redirectCode) {
    if (action === "throw") throw redirectCode;

    if (action === "redirect")
      throw authAdminContext.redirect(`/app/gatekeep?code=${redirectCode}`);
  }
}

export function gatekeep({ current, requiredPlan }: any) {
  if (current.activeSubscriptions.length === 0) {
    return requiredPlan === "Free" ? null : "gatekeep";
  }

  const activePlan = current.activeSubscriptions[0].name;

  const planAllowed = activePlan === requiredPlan;

  if (planAllowed) {
    return null;
  } else {
    return "gatekeep";
  }
}
