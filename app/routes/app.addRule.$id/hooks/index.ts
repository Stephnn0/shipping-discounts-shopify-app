import { useFetcher, useNavigate } from "@remix-run/react";
import { useField, useForm } from "@shopify/react-form";

export type RuleForm = ReturnType<typeof useRuleForm>;

export function useRuleForm() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isNew = true;

  const form = useForm({
    fields: {
      ruleEnabled: useField(true),
      automaticOrCode: useField("CODE"),
      code: useField(""),
      discountType: useField("PERCENTAGE"),
      discountAmount: useField(""),
      //
      shippingRateOption: useField("ALL_RATES"),
      shippingRateName: useField(""),
      //
      startDate: useField(""),
      startTime: useField(""),
      hasEndDate: useField(false),
      endDate: useField(""),
      endTime: useField(""),
    },
    makeCleanAfterSubmit: true,
    onSubmit: async (fieldValues) => {
      const body = {
        ruledEnabled: fieldValues.ruleEnabled,
        automaticOrCode: fieldValues.automaticOrCode,
        code: fieldValues.code,
        discountType: fieldValues.discountType,
        discountAmount: fieldValues.discountAmount,
        //
        shippingRateOption: fieldValues.shippingRateOption,
        shippingRateName: fieldValues.shippingRateName,
        //
        startDate: fieldValues.startDate,
        startTime: fieldValues.startTime,
        hasEndDate: fieldValues.hasEndDate,
        endDate: fieldValues.endDate,
        endTime: fieldValues.endTime,
      };

      console.log(body);

      try {
        if (isNew) {
          console.log("post");

          fetcher.submit(
            { body: JSON.stringify(body) },
            {
              method: "POST",
              encType: "multipart/form-data",
              action: "/api/addRule",
            },
          );

          navigate("/app");
        } else {
          console.log("update");
        }
      } catch (error) {
        return { status: "success" };
      }

      return { status: "success" };
    },
  });

  return {
    ...form,
  };
}
