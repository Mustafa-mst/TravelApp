import { memo } from "react";
import type { ComponentType } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";

import { Card, Text } from "@shared/components";
import { useStyles } from "@shared/hooks";
import {
  LOCAL_TIME_ICON_SIZE,
  countryLocalTimeStyles,
} from "./CountryLocalTime.styles";

export type CountryLocalTimeProps = {
  Icon: ComponentType<SvgProps>;
  clock: string;
  dayPeriod: string;
  label: string;
};

function CountryLocalTimeComponent({
  Icon,
  clock,
  dayPeriod,
  label,
}: CountryLocalTimeProps) {
  const styles = useStyles(countryLocalTimeStyles);

  return (
    <Card shadow="surface" radius="lg" style={styles.panel}>
      <View>
        <View style={styles.clockRow}>
          <Text variant="h4">{clock}</Text>
          {dayPeriod ? <Text variant="caption">{dayPeriod}</Text> : null}
        </View>
        <Text variant="caption" color="muted">
          {label}
        </Text>
      </View>
      <Icon width={LOCAL_TIME_ICON_SIZE} height={LOCAL_TIME_ICON_SIZE} />
    </Card>
  );
}

export const CountryLocalTime = memo(CountryLocalTimeComponent);
