import { memo } from "react";
import { Platform, Pressable, View } from "react-native";
import { DateTimePicker } from "@expo/ui/community/datetime-picker";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { formatDate } from "../../utils";
import { styles } from "./DateField.styles";

export type DateFieldProps = {
  label: string;
  value: Date;
  minimumDate?: Date;
  expanded: boolean;
  onToggle: () => void;
  onChange: (date: Date) => void;
};

const isAndroid = Platform.OS === "android";

function DateFieldComponent({
  label,
  value,
  minimumDate,
  expanded,
  onToggle,
  onChange,
}: DateFieldProps) {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" style={styles.row} onPress={onToggle}>
        <Text variant="body" color="textPrimary">
          {label}
        </Text>
        <View style={[styles.valueBadge, expanded && styles.valueBadgeActive]}>
          <Text variant="bodyMedium" color={expanded ? "primary" : "textPrimary"}>
            {formatDate(value)}
          </Text>
        </View>
      </Pressable>

      {expanded && !isAndroid ? (
        <DateTimePicker
          value={value}
          mode="date"
          display="inline"
          accentColor={colors.primary}
          minimumDate={minimumDate}
          onValueChange={(_event, date) => onChange(date)}
        />
      ) : null}

      {/* Android: dialog presentation opens on mount; both callbacks must
          collapse (unmount) it, otherwise it can never reopen. */}
      {expanded && isAndroid ? (
        <DateTimePicker
          value={value}
          mode="date"
          presentation="dialog"
          accentColor={colors.primary}
          minimumDate={minimumDate}
          style={styles.androidDialogHost}
          onValueChange={(_event, date) => {
            onChange(date);
            onToggle();
          }}
          onDismiss={onToggle}
        />
      ) : null}
    </View>
  );
}

export const DateField = memo(DateFieldComponent);
