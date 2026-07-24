import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useFrontLayer } from "react-native-layer-stack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IconButton, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { PlusIcon } from "@/shared/assets/icons";
import type { BackTarget, RootStackParamList } from "@shared/navigation";
import { ItineraryCard } from "../../components";
import {
  useDeleteItineraryMutation,
  useGetItinerariesQuery,
} from "../../hooks";
import { formatDateRange } from "../../utils";
import type { Itinerary } from "../../types";
import { styles } from "./ItinerariesScreen.styles";

export function ItinerariesScreen() {
  const { t } = useTranslation();
  const { open } = useFrontLayer<BackTarget>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: itineraries, isLoading, error } = useGetItinerariesQuery();
  const { mutateAsync: deleteItinerary } = useDeleteItineraryMutation();

  const confirmDelete = (item: Itinerary) => {
    Alert.alert(
      t("itinerary.deleteConfirmTitle"),
      t("itinerary.deleteConfirmMessage", { title: item.title }),
      [
        { text: t("itinerary.cancel"), style: "cancel" },
        {
          text: t("itinerary.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItinerary(item.id);
            } catch (deleteError) {
              Alert.alert(
                t("itinerary.deleteError"),
                deleteError instanceof Error ? deleteError.message : undefined,
              );
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Itinerary }) => (
    <ItineraryCard
      title={item.title}
      location={item.cities?.name ?? ""}
      dateLabel={formatDateRange(item.start_date, item.end_date)}
      imageUri={item.cover_photo ?? undefined}
      onPress={() =>
        navigation.navigate("ItineraryDetail", { itinerary: item })
      }
      onEdit={() =>
        open({ target: "createItinerary", params: { itinerary: item } })
      }
      onDelete={() => confirmDelete(item)}
    />
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.headerRow}>
        <Text color="textPrimary" variant="h4SemiBold">
          {t("itinerary.title")}
        </Text>
        <IconButton
          variant="filled"
          hitSlop={15}
          onPress={() => open({ target: "createItinerary" })}
          style={{
            padding: 8,
            borderRadius: 999,
            borderColor: colors.border,
            backgroundColor: colors.white,
            borderWidth: 1,
          }}
          icon={<PlusIcon width={24} height={24} color={colors.textPrimary} />}
        />
      </View>
      <FlatList
        data={itineraries ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator color={colors.primary} />
          ) : error ? (
            <Text color="danger" variant="body">
              {error.message}
            </Text>
          ) : (
            <Text color="textSecondary" variant="body">
              {t("itinerary.empty")}
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}
