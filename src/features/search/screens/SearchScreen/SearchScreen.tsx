import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./SearchScreen.styles";
import {
  SearchFilterCard,
  SearchInput,
  SearchResultList,
} from "../../components";
import { useCountrySearch } from "../../hooks";

export function SearchScreen() {
  const {
    query,
    filters,
    isFilterOpen,
    isSearching,
    isFiltering,
    results,
    isFetching,
    isError,
    history,
    onRetry,
    onChangeText,
    onGoBack,
    onToggleFilters,
    onApplyFilters,
    onSelectCountry,
    onRemoveHistory,
  } = useCountrySearch();

  return (
    <SafeAreaView style={styles.safe}>
      <SearchInput
        value={query}
        onChangeText={onChangeText}
        onGoBack={onGoBack}
        onOpenFilters={onToggleFilters}
        isFilterActive={isFiltering}
      />
      {isFilterOpen ? (
        <SearchFilterCard filters={filters} onApply={onApplyFilters} />
      ) : null}
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
    </SafeAreaView>
  );
}
