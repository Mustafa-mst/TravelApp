import { memo, useCallback, useState } from "react";
import { View } from "react-native";

import { useStyles } from "@shared/hooks";
import { listGroupStyles } from "./ListGroup.styles";
import { ListGroupRow } from "./ListGroupRow";
import type { ListGroupProps } from "./listGroup.types";

function ListGroupComponent({
  items,
  hideSeparator = false,
  style,
}: ListGroupProps) {
  const styles = useStyles(listGroupStyles);

  const [openKey, setOpenKey] = useState<string | undefined>(undefined);

  const handleToggle = useCallback((key: string) => {
    setOpenKey((current) => (current === key ? undefined : key));
  }, []);

  return (
    <View style={[styles.root, style]}>
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
