import { memo } from "react";
import { Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@shared/components";
import { colors } from "@shared/styles";
import { CalendarMonthIcon } from "@/shared/assets/icons";
import { styles } from "./DayCountStepper.styles";

export type DayCountStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
};

function DayCountStepperComponent({
  value,
  min = 1,
  max = 30,
  onChange,
}: DayCountStepperProps) {
  const { t } = useTranslation();
  const safeValue = Number.isFinite(value) ? value : min;
  const canDecrement = safeValue > min;
  const canIncrement = safeValue < max;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CalendarMonthIcon width={20} height={20} color={colors.iconPrimary} />
        <Text variant="bodyExtraLarge" color="textPrimary">
          {t("itinerary.duration")}
        </Text>
      </View>

      <View style={styles.stepperRow}>
        <Pressable
          accessibilityRole="button"
          disabled={!canDecrement}
          style={[styles.button, !canDecrement && styles.buttonDisabled]}
          onPress={() => onChange(safeValue - 1)}
          hitSlop={10}
        >
          <Text variant="bodyExtraLarge" color="textPrimary">
            −
          </Text>
        </Pressable>

        <Text variant="bodyExtraLarge" color="textPrimary" style={styles.value}>
          {t("itinerary.overview.dayCount", { count: safeValue })}
        </Text>

        <Pressable
          accessibilityRole="button"
          disabled={!canIncrement}
          style={[styles.button, !canIncrement && styles.buttonDisabled]}
          onPress={() => onChange(safeValue + 1)}
          hitSlop={10}
        >
          <Text variant="bodyExtraLarge" color="textPrimary">
            +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const DayCountStepper = memo(DayCountStepperComponent);
