import { memo } from "react";
import { FlatList, View } from "react-native";

import { Text } from "@shared/components";
import { CountryPreviewCard } from "../CountryPreviewCard";
import { styles } from "./CountryPreviewList.styles";
import { toPreviewItem } from "../../utils";
import type { CountryReveals, DestinationItem } from "../../types";

export type CountryPreviewListProps = {
  title?: string;
  variant?: "reveal" | "destination";
  data: (DestinationItem | CountryReveals)[];
  onPressCountry?: (countryId: string) => void;
};

function CountryPreviewListComponent({
  title,
  data,
  variant = "destination",
  onPressCountry,
}: CountryPreviewListProps) {
  const items = data.map(toPreviewItem);
  const isReveal = variant === "reveal";
  return (
    <View style={[styles.container, isReveal && { borderTopWidth: 0 }]}>
      {isReveal || title ? (
        <View style={styles.title}>
          <Text variant={isReveal ? "h4" : "h5"}>
            {isReveal ? "Did You Know?" : title}
          </Text>
          {isReveal && (
            <Text variant="body" color="textLight">
              Discover what makes this country unique.
            </Text>
          )}
        </View>
      ) : null}
      <FlatList
        data={items}
        horizontal
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CountryPreviewCard
            text={item.text}
            image={item.image}
            countryId={item.countryId}
            onPress={onPressCountry}
          />
        )}
      />
    </View>
  );
}

export const CountryPreviewList = memo(CountryPreviewListComponent);
