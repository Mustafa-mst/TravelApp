import { type StyleProp, View, type ViewStyle } from "react-native";
import { useTranslation } from "react-i18next";

import type { StateViewContent } from "@shared/types";
import { Button } from "../Button";
import { Text } from "../Text";
import { styles } from "./StateView.styles";

type StateViewBlockProps = StateViewContent & {
  iconColor: string;
  badgeColor: string;
  style?: StyleProp<ViewStyle>;
};

export function StateViewBlock({
  label,
  hint,
  Icon,
  retryLabel,
  onRetry,
  iconColor,
  badgeColor,
  style,
}: StateViewBlockProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.centered, style]}>
      {Icon ? (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Icon width={28} height={28} color={iconColor} />
        </View>
      ) : null}
      <Text variant="bodyLargeMedium" textAlign="center">
        {label}
      </Text>
      {hint ? (
        <Text
          variant="body"
          color="textMuted"
          textAlign="center"
          style={styles.hint}
        >
          {hint}
        </Text>
      ) : null}
      {onRetry ? (
        <View style={styles.action}>
          <Button
            label={retryLabel ?? t("common.retry")}
            outlined
            onPress={onRetry}
          />
        </View>
      ) : null}
    </View>
  );
}
