import { memo, useCallback, useState } from "react";
import { View } from "react-native";

import { useStyles, useThemeColors } from "@shared/hooks";
import { radius as radiusTokens } from "@shared/styles";
import { listGroupStyles, listGroupVariants } from "./ListGroup.styles";
import { ListGroupRow } from "./ListGroupRow";
import type { ListGroupProps } from "./listGroup.types";

function ListGroupComponent({
  items,
  variant = "default",
  radius = "3xl",
  hideSeparator = false,
  style,
}: ListGroupProps) {
  const styles = useStyles(listGroupStyles);
  const colors = useThemeColors();

  const [openKey, setOpenKey] = useState<string | undefined>(undefined);

  const handleToggle = useCallback((key: string) => {
    setOpenKey((current) => (current === key ? undefined : key));
  }, []);

  return (
    <View
      style={[
        styles.root,
        variant !== "transparent" && styles.elevated,
        {
          backgroundColor: colors[listGroupVariants[variant]],
          borderRadius: radiusTokens[radius],
        },
        style,
      ]}
    >
      {items.map((item, index) => (
        <View key={item.key}>
          {index > 0 && !hideSeparator ? (
            <View style={styles.separator} />
          ) : null}
          <ListGroupRow
            item={item}
            isOpen={openKey === item.key}
            onToggle={handleToggle}
          />
        </View>
      ))}
    </View>
  );
}

export const ListGroup = memo(ListGroupComponent);
