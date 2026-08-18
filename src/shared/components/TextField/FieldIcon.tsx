import { memo, type ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import { colors } from "@shared/styles";
import { FIELD_ICON_SIZE } from "./textField.constants";

type FieldIconProps = {
  icon: ComponentType<SvgProps>;
  color?: keyof typeof colors;
};

/** Pins every in-field icon to one size and tone, whoever supplies the svg. */
function FieldIconComponent({ icon: Icon, color = "iconTertiary" }: FieldIconProps) {
  return (
    <Icon
      width={FIELD_ICON_SIZE}
      height={FIELD_ICON_SIZE}
      color={colors[color]}
    />
  );
}

export const FieldIcon = memo(FieldIconComponent);
