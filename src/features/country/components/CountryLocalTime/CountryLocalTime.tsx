import { memo } from "react";
import type { ComponentType } from "react";
import { View } from "react-native";
import type { SvgProps } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

import { LocationIcon } from "@shared/assets/icons";
import { Text } from "@shared/components";
import { useStyles } from "@shared/hooks";
import { countryLocalTimeStyles } from "./CountryLocalTime.styles";

export type CountryLocalTimeProps = {
  Icon: ComponentType<SvgProps>;
  gradient: readonly string[];
  locations: readonly number[];
  foreground: string;
  clock: string;
  dayPeriod: string;
  city: string;
};

function CountryLocalTimeComponent({
  Icon,
  gradient,
  locations,
  foreground,
  clock,
  dayPeriod,
  city,
}: CountryLocalTimeProps) {
  const styles = useStyles(countryLocalTimeStyles);

  return (
    <LinearGradient
      colors={gradient as [string, string, ...string[]]}
      locations={locations as [number, number, ...number[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.panel}
    >
      <View style={styles.timeBlock}>
        <View style={styles.clockRow}>
          <Text variant="h5" style={{ color: foreground }}>
            {clock}
          </Text>
          {dayPeriod ? (
            <Text variant="caption" style={{ color: foreground }}>
              {dayPeriod}
            </Text>
          ) : null}
        </View>
        {city ? (
          <View style={styles.cityRow}>
            <LocationIcon width={12} height={12} color={foreground} />
            <Text
              variant="caption"
              numberOfLines={1}
              style={[styles.city, { color: foreground }]}
            >
              {city}
            </Text>
          </View>
        ) : null}
      </View>
      <Icon width={28} height={28} color={foreground} />
    </LinearGradient>
  );
}

export const CountryLocalTime = memo(CountryLocalTimeComponent);
