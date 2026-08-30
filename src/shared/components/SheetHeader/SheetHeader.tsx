import { memo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { useStyles } from "@shared/hooks";
import { CloseButton } from "../CloseButton";
import { Text } from "../Text";
import {
  sheetHeaderStyles,
  sheetHeaderTitleVariants,
} from "./SheetHeader.styles";
import type { SheetHeaderProps } from "./sheetHeader.types";

function SheetHeaderComponent({
  title,
  onClose,
  variant = "stacked",
  children,
}: SheetHeaderProps) {
  const { t } = useTranslation();
  const styles = useStyles(sheetHeaderStyles);

  const closeButton = (
    <CloseButton accessibilityLabel={t("common.close")} onPress={onClose} />
  );

  const titleText = (
    <Text
      variant={sheetHeaderTitleVariants[variant]}
      numberOfLines={1}
      style={variant === "inline" ? styles.inlineTitle : undefined}
    >
      {title}
    </Text>
  );

  return (
    <View style={styles.header}>
      {variant === "inline" ? (
        <View style={styles.inlineRow}>
          {titleText}
          {closeButton}
        </View>
      ) : (
        <>
          <View style={styles.stackedActions}>{closeButton}</View>
          {titleText}
        </>
      )}
      {children}
    </View>
  );
}

export const SheetHeader = memo(SheetHeaderComponent);
