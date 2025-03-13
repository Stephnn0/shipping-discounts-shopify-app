import { useCallback, useState } from "react";
import { RuleForm } from "../hooks";
import {
  InlineGrid,
  Layout,
  Text,
  Box,
  Card,
  Select,
  Checkbox,
} from "@shopify/polaris";
import CustomDatePicker from "./DatePicker";

type DateSelectorProps = {
  form: RuleForm;
};

export default function DateSelector({ form }: DateSelectorProps) {
  const [selectedHour, setSelectedHour] = useState("12");

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const { fields } = form;

  const { startDate, startTime, endDate, endTime, hasEndDate } = fields;

  const handleStartDateChange = useCallback(
    (newDate: Date) => {
      setSelectedDate(newDate);
      startDate.onChange(String(newDate));
    },
    [startDate],
  );

  const handleStartTimeChange = useCallback(
    (newTime: string) => {
      setSelectedHour(newTime);

      startTime.onChange(newTime);
    },
    [startTime],
  );

  const handleEndDateChange = useCallback(
    (newDate: Date) => {
      setSelectedEndDate(newDate);
      endDate.onChange(String(newDate));
    },
    [endDate],
  );

  const handleEndTimeChange = useCallback(
    (newTime: string) => {
      setSelectedHour(newTime);

      endTime.onChange(newTime);
    },
    [endTime],
  );

  return (
    <InlineGrid columns={{ xs: 1, sm: 1, md: ["oneThird", "twoThirds"] }}>
      <Layout>
        <Layout.Section>
          <Text as="h1" fontWeight="bold">
            Active Dates
          </Text>
          <p>
            Select an optional start and end time for your shipping discount
          </p>
        </Layout.Section>
      </Layout>

      <Box maxWidth="600px" width="100%">
        <Card padding="500">
          <Layout.Section>
            <Text as="h1" fontWeight="bold">
              Active Dates
            </Text>
            <InlineGrid columns={2}>
              <CustomDatePicker
                selectedDate={selectedDate}
                setSelectedDate={handleStartDateChange}
              />

              <div style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                <Select
                  label="Start time (EDT)"
                  options={hourOptions}
                  value={selectedHour}
                  onChange={handleStartTimeChange}
                />
              </div>
            </InlineGrid>
          </Layout.Section>

          <Layout.Section>
            <Checkbox
              label="Set end date"
              checked={hasEndDate.value}
              onChange={(val) => hasEndDate.onChange(val)}
            />
          </Layout.Section>

          {hasEndDate.value && (
            <Layout.Section>
              <Text as="h1" fontWeight="bold">
                Active Dates
              </Text>
              <InlineGrid columns={2}>
                <CustomDatePicker
                  selectedDate={selectedEndDate}
                  setSelectedDate={handleEndDateChange}
                />

                <div style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                  <Select
                    label="Start time (EDT)"
                    options={hourOptions}
                    value={selectedHour}
                    onChange={handleEndTimeChange}
                  />
                </div>
              </InlineGrid>
            </Layout.Section>
          )}
        </Card>
      </Box>
    </InlineGrid>
  );
}
