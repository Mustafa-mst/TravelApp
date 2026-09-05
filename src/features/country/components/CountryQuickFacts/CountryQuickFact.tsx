import { memo } from "react";
import type { ComponentType } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Text } from "@shared/components";
import { useStyles } from "@shared/hooks";
import {
  QUICK_FACT_ICON_SIZE,
  countryQuickFactsStyles,
} from "./CountryQuickFacts.styles";

export type CountryQuickFactProps = {
  Icon: ComponentType<SvgProps>;
  label: string;
  value: string;
};

function CountryQuickFactComponent({
  Icon,
  label,
  value,
}: CountryQuickFactProps) {
  const styles = useStyles(countryQuickFactsStyles);

  return (
    <View style={styles.fact}>
      <Icon width={QUICK_FACT_ICON_SIZE} height={QUICK_FACT_ICON_SIZE} />
      <View style={styles.values}>
        <Text variant="captionMedium" color="muted">
          {label}
        </Text>
        <Text variant="captionBold">{value}</Text>
      </View>
    </View>
  );
}

export const CountryQuickFact = memo(CountryQuickFactComponent);
