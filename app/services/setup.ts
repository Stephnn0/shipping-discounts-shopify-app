import { PrismaClient } from "@prisma/client";
import { authenticate } from "app/shopify.server";

export type AuthAdminContext = Awaited<ReturnType<typeof authenticate.admin>>;

export async function setUpStore(db: PrismaClient, context: AuthAdminContext) {
  const {
    session: { shop },
  } = context;

  try {
    const shopifyStore = await db.shopifyStore.findUnique({ where: { shop } });

    if (!shopifyStore) {
      await db.shopifyStore.create({
        data: {
          shop,
        },
      });
    }

    return "setup";
  } catch (error) {
    console.log(error);
  }
}
