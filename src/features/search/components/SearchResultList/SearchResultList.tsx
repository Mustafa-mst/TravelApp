import { FlatList, View } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { styles } from "./SearchResultList.styles";
import { CountryRow } from "./CountryRow";
import { StateView, Text } from "@shared/components";
import { SearchIcon } from "@shared/assets/icons";
import type { CountrySearchResult } from "../../types";

const ItemSeparator = () => <View style={styles.border} />;

type SearchResultListProps = {
  query: string;
  isSearching: boolean;
  isFiltering?: boolean;
  results?: CountrySearchResult[];
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
  history: CountrySearchResult[];
  onSelectCountry: (country: CountrySearchResult) => void;
  onRemoveHistory: (cca2: string) => void;
};

const SearchResultListComponent = ({
  query,
  isSearching,
  isFiltering = false,
  results,
  isFetching,
  isError,
  onRetry,
  history,
  onSelectCountry,
  onRemoveHistory,
}: SearchResultListProps) => {
  const { t } = useTranslation();

  const isListing = isSearching || isFiltering;

  const title = isListing ? t("search.results") : t("search.history");

  const renderItem = useCallback(
    ({ item }: { item: CountrySearchResult }) => (
      <CountryRow
        country={item}
        onPress={() => onSelectCountry(item)}
        // Only history rows are removable; results have nothing to remove from.
        onRemove={isListing ? undefined : () => onRemoveHistory(item.cca2)}
      />
    ),
    [isListing, onRemoveHistory, onSelectCountry],
  );

  const emptyLabel = isListing
    ? isSearching
      ? t("search.empty", { query })
      : t("search.filterEmpty")
    : t("search.historyEmpty");

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text variant="bodyLargeMedium">{title}</Text>
      </View>
      <StateView
        isLoading={isListing && isFetching && !results}
        isError={isListing && isError}
        isEmpty={isListing ? !results?.length : !history.length}
        error={{
          label: t("search.error"),
          hint: t("search.errorHint"),
          onRetry,
        }}
        empty={{
          label: emptyLabel,
          Icon: SearchIcon,
          hint: isListing ? undefined : t("search.historyEmptyHint"),
        }}
      >
        <FlatList
          data={isListing ? results : history}
          renderItem={renderItem}
          keyExtractor={(item) => item.cca2}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={ItemSeparator}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </StateView>
    </View>
  );
};

export const SearchResultList = React.memo(SearchResultListComponent);
