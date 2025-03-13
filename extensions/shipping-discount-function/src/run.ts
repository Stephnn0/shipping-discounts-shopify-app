import type { RunInput, FunctionRunResult, Target } from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discounts: [],
};

type Configuration = {};

export function run(input: RunInput): FunctionRunResult {
  console.log("----------------- function ran ------------------");

  const parsedBody = JSON.parse(input.discountNode.metafield?.value as string);

  const deliveryOptions: Target[] = [];

  if (parsedBody.shippingRateOption === "BY_RATE_NAME") {
    for (const deliveryGroup of input.cart.deliveryGroups) {
      const match = deliveryGroup.deliveryOptions.find(
        (m) => m.title === parsedBody.shippingRateName,
      );
      if (match) {
        deliveryOptions.push({
          deliveryOption: {
            handle: match.handle,
          },
        });
      }
    }
  } else if (parsedBody.shippingRateOption === "ALL_RATES") {
    for (const deliveryGroup of input.cart.deliveryGroups) {
      for (const option of deliveryGroup.deliveryOptions) {
        deliveryOptions.push({
          deliveryOption: {
            handle: option.handle,
          },
        });
      }
    }
  }

  if (deliveryOptions.length === 0 || input.cart.cost.totalAmount.amount < 2) {
    return EMPTY_DISCOUNT;
  }

  let discountValue;

  switch (parsedBody.discountType) {
    case "FIXED-AMOUNT":
      discountValue = {
        fixedAmount: {
          amount: parseFloat(parsedBody.discountAmount),
        },
      };
      break;
    case "PERCENTAGE":
      discountValue = {
        percentage: {
          value: parseFloat(parsedBody.discountAmount),
        },
      };
      break;
    default:
      discountValue = {
        fixedAmount: {
          amount: 0,
        },
      };
  }

  return {
    discounts: [
      {
        targets: deliveryOptions,
        value: discountValue,
      },
    ],
  };
}
