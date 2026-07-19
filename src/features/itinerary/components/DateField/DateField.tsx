import { memo } from "react";
import { Platform, Pressable, View } from "react-native";
import { DateTimePicker } from "@expo/ui/community/datetime-picker";
import { useTranslation } from "react-i18next";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { ArrowLeftIcon, CalendarMonthIcon } from "@/shared/assets/icons";
import { formatDateWithWeekday } from "../../utils";
import { styles } from "./DateField.styles";

export type ActiveDatePicker = "start" | "end" | null;

export type DateFieldProps = {
  startDate: Date;
  endDate: Date;
  activePicker: ActiveDatePicker;
  onToggleStart: () => void;
  onToggleEnd: () => void;
  onStartChange: (date: Date) => void;
  onEndChange: (date: Date) => void;
};

const isAndroid = Platform.OS === "android";

function DateFieldComponent({
  startDate,
  endDate,
  activePicker,
  onToggleStart,
  onToggleEnd,
  onStartChange,
  onEndChange,
}: DateFieldProps) {
  const { t } = useTranslation();
  const isStart = activePicker === "start";
  const isEnd = activePicker === "end";

  const pickerValue = isEnd ? endDate : startDate;
  const pickerMinimumDate = isEnd ? startDate : undefined;
  const onPickerChange = isEnd ? onEndChange : onStartChange;
  const onPickerToggle = isEnd ? onToggleEnd : onToggleStart;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CalendarMonthIcon width={20} height={20} color={colors.iconPrimary} />
        <Text variant="bodyExtraLarge" color="textPrimary">
          {t("itinerary.duration")}
        </Text>
      </View>

      <View style={styles.rangeRow}>
        <Pressable
          accessibilityRole="button"
          style={styles.dateColumn}
          onPress={onToggleStart}
          hitSlop={10}
        >
          <Text
            variant="bodyExtraLarge"
            color={isStart ? "primary" : "textPrimary"}
          >
            {formatDateWithWeekday(startDate)}
          </Text>
        </Pressable>

        <View style={styles.arrow}>
          <ArrowLeftIcon width={20} height={20} color={colors.iconTertiary} />
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.dateColumn}
          onPress={onToggleEnd}
          hitSlop={10}
        >
          <Text
            variant="bodyExtraLarge"
            color={isEnd ? "primary" : "textPrimary"}
          >
            {formatDateWithWeekday(endDate)}
          </Text>
        </Pressable>
      </View>

      {activePicker && !isAndroid ? (
        <DateTimePicker
          value={pickerValue}
          mode="date"
          display="inline"
          accentColor={colors.primary}
          minimumDate={pickerMinimumDate}
          onValueChange={(_event, date) => onPickerChange(date)}
        />
      ) : null}

      {activePicker && isAndroid ? (
        <DateTimePicker
          value={pickerValue}
          mode="date"
          presentation="dialog"
          accentColor={colors.primary}
          minimumDate={pickerMinimumDate}
          style={styles.androidDialogHost}
          onValueChange={(_event, date) => {
            onPickerChange(date);
            onPickerToggle();
          }}
          onDismiss={onPickerToggle}
        />
      ) : null}
    </View>
  );
}

export const DateField = memo(DateFieldComponent);
