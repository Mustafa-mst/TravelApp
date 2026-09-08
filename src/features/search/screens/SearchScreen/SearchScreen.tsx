import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStyles } from "@shared/hooks";
import { searchScreenStyles } from "./SearchScreen.styles";
import {
  SearchFilterSheet,
  SearchInput,
  SearchResultList,
} from "../../components";
import { useCountrySearch } from "../../hooks";

export function SearchScreen() {
  const styles = useStyles(searchScreenStyles);
  const {
    query,
    filters,
    filterSheetRef,
    isSearching,
    isFiltering,
    results,
    isFetching,
    isError,
    history,
    onRetry,
    onChangeText,
    onOpenFilters,
    onApplyFilters,
    onSelectCountry,
    onRemoveHistory,
  } = useCountrySearch();

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.header}>
        <SearchInput
          value={query}
          onChangeText={onChangeText}
          onOpenFilters={onOpenFilters}
          isFilterActive={isFiltering}
        />
      </View>
      <View style={styles.body}>
        <SearchResultList
          query={query}
          isSearching={isSearching}
          isFiltering={!isSearching && isFiltering}
          results={results}
          isFetching={isFetching}
          isError={isError}
          onRetry={onRetry}
          history={history}
          onSelectCountry={onSelectCountry}
          onRemoveHistory={onRemoveHistory}
        />
      </View>

      <SearchFilterSheet
        sheetRef={filterSheetRef}
        filters={filters}
        onApply={onApplyFilters}
      />
    </SafeAreaView>
  );
}
