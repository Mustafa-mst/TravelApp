import { FlatList, View } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { styles } from "./SearchResultList.styles";
import { CloseIcon, TrashBin } from "@shared/assets/icons";
import { IconButton, Text } from "@shared/components";
import { colors } from "@/shared/styles";

const list = ["Turkey", "Samoa", "Spain"];

const ItemSeparator = () => <View style={styles.border} />;

const SearchResultListComponent = () => {
  const { t } = useTranslation();

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
        <IconButton icon={<TrashBin width={20} height={20} color={colors.text} />} />
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={ItemSeparator}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

export const SearchResultList = React.memo(SearchResultListComponent);
