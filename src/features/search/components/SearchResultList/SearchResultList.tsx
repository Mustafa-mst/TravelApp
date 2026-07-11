import { FlatList, View } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { styles } from "./SearchResultList.styles";
import { CloseIcon, TrashBin } from "@shared/assets/icons";
import { IconButton, Text } from "@shared/components";

const list = ["Turkey", "Samoa", "Spain", "Turkey", "Samoa", "Spain"];
const SearchResultListComponent = () => {
  const { t } = useTranslation();
  const ItemSeperator = () => <View style={styles.border} />;

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.itemContainer}>
        <Text color="textLight">{item}</Text>
        <IconButton icon={<CloseIcon width={18} height={18} />} />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text variant="bodyLarge">{t("search.history")}</Text>
        <IconButton icon={<TrashBin width={16} height={16} />} />
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={ItemSeperator}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

export const SearchResultList = React.memo(SearchResultListComponent);
