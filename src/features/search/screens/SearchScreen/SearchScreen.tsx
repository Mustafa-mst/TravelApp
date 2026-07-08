import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./SearchScreen.styles";
import { SearchInput, SearchResultList } from "../../components";

export function SearchScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <SearchInput />
      <SearchResultList />
    </SafeAreaView>
  );
}
