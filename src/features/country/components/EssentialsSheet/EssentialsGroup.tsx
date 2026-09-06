import { Fragment, memo } from "react";
import { View } from "react-native";

import { Divider, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { ESSENTIAL_ROW_ICONS } from "../../constants";
import type { CountryEssentialGroup } from "../../hooks";
import {
  ROW_ICON_SIZE,
  essentialsSheetStyles,
} from "./EssentialsSheet.styles";

export type EssentialsGroupProps = {
  group: CountryEssentialGroup;
};

function EssentialsGroupComponent({ group }: EssentialsGroupProps) {
  const styles = useStyles(essentialsSheetStyles);
  const colors = useThemeColors();

  return (
    <View style={styles.group}>
      <Text variant="captionMedium" color="muted" style={styles.groupTitle}>
        {group.title.toUpperCase()}
      </Text>
      <View style={styles.card}>
        {group.rows.map(({ key, label, value }, index) => {
          const Icon = ESSENTIAL_ROW_ICONS[key];

          return (
            <Fragment key={key}>
              {index > 0 ? <Divider margin={0} /> : null}
              <View style={styles.row}>
                {Icon ? (
                  <View style={styles.iconCircle}>
                    <Icon
                      width={ROW_ICON_SIZE}
                      height={ROW_ICON_SIZE}
                      color={colors.accentSoftForeground}
                    />
                  </View>
                ) : null}
                <View style={styles.rowText}>
                  <Text variant="caption" color="muted">
                    {label}
                  </Text>
                  <Text variant="bodyMedium">{value}</Text>
                </View>
              </View>
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}

export const EssentialsGroup = memo(EssentialsGroupComponent);
