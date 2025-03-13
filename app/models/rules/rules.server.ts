import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function getDiscountRules(
  prismaArgs: Prisma.DiscountRulesFindManyArgs<DefaultArgs>,
  db: PrismaClient,
) {
  try {
    const discountRules = await db.discountRules.findMany(prismaArgs);

    return discountRules;
  } catch (error) {
    console.log(error);
  }
}

export async function getDiscountRule(
  prismaArgs: Prisma.DiscountRulesFindUniqueArgs<DefaultArgs>,
  db: PrismaClient,
) {
  try {
    const discountRule = await db.discountRules.findUnique(prismaArgs);

    return discountRule;
  } catch (error) {
    console.log(error);
  }
}

export type DiscountRule = Awaited<ReturnType<typeof createDiscountRule>>;

export async function createDiscountRule(
  prismaArgs: Prisma.DiscountRulesCreateArgs<DefaultArgs>,
  db: PrismaClient,
) {
  try {
    const createdDiscountRule = await db.discountRules.create(prismaArgs);

    console.log(createdDiscountRule, "created discount rule");

    return createdDiscountRule;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDiscountRule(
  prismaArgs: Prisma.DiscountRulesUpdateArgs<DefaultArgs>,
  db: PrismaClient,
) {
  try {
    const updatedDiscountRule = await db.discountRules.update(prismaArgs);

    return updatedDiscountRule;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDiscountRule(
  prismaArgs: Prisma.DiscountRulesDeleteArgs<DefaultArgs>,
  db: PrismaClient,
) {
  try {
    const deletedDiscountRule = await db.discountRules.delete(prismaArgs);

    return deletedDiscountRule;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteManyDiscountRule(
  prismaArgs: Prisma.DiscountRulesDeleteManyArgs<DefaultArgs>,
  db: PrismaClient,
) {
  try {
    const deletedManyDiscountRule =
      await db.discountRules.deleteMany(prismaArgs);

    return deletedManyDiscountRule;
  } catch (error) {
    console.log(error);
  }
}
