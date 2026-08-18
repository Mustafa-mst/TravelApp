import { memo, type ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

import { useThemeColors } from "@shared/hooks";
import type { ColorToken } from "@shared/styles";
import { FIELD_ICON_SIZE } from "./textField.constants";

type FieldIconProps = {
  icon: ComponentType<SvgProps>;
  color?: ColorToken;
};

/** Pins every in-field icon to one size and tone, whoever supplies the svg. */
function FieldIconComponent({ icon: Icon, color = "muted" }: FieldIconProps) {
  const colors = useThemeColors();

  return (
    <Icon
      width={FIELD_ICON_SIZE}
      height={FIELD_ICON_SIZE}
      color={colors[color]}
    />
  );
}

export const FieldIcon = memo(FieldIconComponent);
