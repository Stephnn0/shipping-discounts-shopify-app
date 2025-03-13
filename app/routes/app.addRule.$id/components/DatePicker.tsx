import { CalendarIcon } from "@shopify/polaris-icons";
import {
  BlockStack,
  Box,
  Card,
  Popover,
  DatePicker,
  TextField,
  Icon,
} from "@shopify/polaris";
import { useEffect, useState } from "react";

type DatePickerProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export default function CustomDatePicker({
  selectedDate,
  setSelectedDate,
}: DatePickerProps) {
  const [visible, setVisible] = useState(false);

  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const formattedValue = selectedDate.toISOString().slice(0, 10);

  function handleOnClose() {
    setVisible(false);
  }

  function handleDateChange({ end: newSelectedDate }: any) {
    setSelectedDate(newSelectedDate);
    setVisible(false);
  }

  function handleMonthChange(month: any, year: any) {
    setDate({ month, year });
  }

  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);

  return (
    <BlockStack inlineAlign="center" gap="400">
      <Box minWidth="276px" padding={{ xs: "200" }}>
        <Popover
          active={visible}
          autofocusTarget="none"
          preferredAlignment="left"
          fullWidth
          preferInputActivator={false}
          preferredPosition="below"
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <TextField
              role="combobox"
              label={"Start Date"}
              prefix={<Icon source={CalendarIcon} />}
              onFocus={() => setVisible(true)}
              value={formattedValue}
              autoComplete="off"
            />
          }
        >
          <Card>
            <DatePicker
              month={month}
              year={year}
              selected={selectedDate}
              onMonthChange={handleMonthChange}
              onChange={handleDateChange}
            />
          </Card>
        </Popover>
      </Box>
    </BlockStack>
  );
}
