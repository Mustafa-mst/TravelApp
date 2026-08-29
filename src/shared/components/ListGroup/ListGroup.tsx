import { memo } from "react";
import { Pressable, View } from "react-native";

import { ChevronRightIcon } from "@shared/assets/icons";
import { useStyles, useThemeColors } from "@shared/hooks";
import { Text } from "../Text";
import { listGroupStyles, listGroupVariants } from "./ListGroup.styles";
import { DEFAULT_ICON_SIZE } from "./listGroup.constants";
import type {
  ListGroupItemContentProps,
  ListGroupItemDescriptionProps,
  ListGroupItemPrefixProps,
  ListGroupItemProps,
  ListGroupItemSuffixProps,
  ListGroupItemTitleProps,
  ListGroupProps,
} from "./listGroup.types";

function ListGroupComponent({
  children,
  variant = "default",
  style,
  ...rest
}: ListGroupProps) {
  const styles = useStyles(listGroupStyles);
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: colors[listGroupVariants[variant]] },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

function ListGroupItemComponent({
  children,
  style,
  ...rest
}: ListGroupItemProps) {
  const styles = useStyles(listGroupStyles);

  return (
    <Pressable
      style={(state) => [
        styles.item,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

function ListGroupItemPrefixComponent({
  children,
  ...rest
}: ListGroupItemPrefixProps) {
  return <View {...rest}>{children}</View>;
}

function ListGroupItemContentComponent({
  children,
  style,
  ...rest
}: ListGroupItemContentProps) {
  const styles = useStyles(listGroupStyles);

  return (
    <View style={[styles.itemContent, style]} {...rest}>
      {children}
    </View>
  );
}

function ListGroupItemTitleComponent({
  children,
  variant = "bodyLargeMedium",
  color = "foreground",
  ...rest
}: ListGroupItemTitleProps) {
  return (
    <Text variant={variant} color={color} {...rest}>
      {children}
    </Text>
  );
}

function ListGroupItemDescriptionComponent({
  children,
  variant = "body",
  color = "muted",
  ...rest
}: ListGroupItemDescriptionProps) {
  return (
    <Text variant={variant} color={color} {...rest}>
      {children}
    </Text>
  );
}

function ListGroupItemSuffixComponent({
  children,
  iconProps,
  ...rest
}: ListGroupItemSuffixProps) {
  const colors = useThemeColors();
  const size = iconProps?.size ?? DEFAULT_ICON_SIZE;

  return (
    <View {...rest}>
      {children ?? (
        <ChevronRightIcon
          width={size}
          height={size}
          color={iconProps?.color ?? colors.muted}
        />
      )}
    </View>
  );
}

export const ListGroup = Object.assign(memo(ListGroupComponent), {
  Item: memo(ListGroupItemComponent),
  ItemPrefix: memo(ListGroupItemPrefixComponent),
  ItemContent: memo(ListGroupItemContentComponent),
  ItemTitle: memo(ListGroupItemTitleComponent),
  ItemDescription: memo(ListGroupItemDescriptionComponent),
  ItemSuffix: memo(ListGroupItemSuffixComponent),
});
