import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "app/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);

    const code = params.get("code");

    return {
      success: true,
      payload: { code },
      message: "loaded",
    };
  } catch (error) {
    console.error("Error in loader", error);
    return null;
  }
};
