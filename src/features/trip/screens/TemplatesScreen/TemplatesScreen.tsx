import {
  Alert,
  FlatList,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useFrontLayer } from "react-native-layer-stack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IconButton, Spinner, Text } from "@shared/components";
import { colors, spacing } from "@shared/styles";
import { PlusIcon } from "@/shared/assets/icons";
import type { BackTarget, RootStackParamList } from "@shared/navigation";
import { TemplateFolderCard } from "../../components";
import { TripDetailMode } from "../../constants";
import { useDeleteTemplateMutation, useMyTemplateListQuery } from "../../hooks";
import type { TripTemplate } from "../../types";
import { styles } from "./TemplatesScreen.styles";

export function TemplatesScreen() {
  const { t } = useTranslation();
  const { open } = useFrontLayer<BackTarget>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data: templates, isLoading, error } = useMyTemplateListQuery();
  const { mutateAsync: deleteTemplate } = useDeleteTemplateMutation();
  const { width: screenWidth } = useWindowDimensions();

  // Screen padding (12 each side) + the gap between the two columns.
  const folderWidth = (screenWidth - (spacing.md - 4) * 2 - spacing.md) / 2;

  const confirmDelete = (item: TripTemplate) => {
    Alert.alert(
      t("template.deleteConfirmTitle"),
      t("template.deleteConfirmMessage", { title: item.title }),
      [
        { text: t("template.cancel"), style: "cancel" },
        {
          text: t("template.delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTemplate(item.id);
            } catch (deleteError) {
              Alert.alert(
                t("template.deleteError"),
                deleteError instanceof Error ? deleteError.message : undefined,
              );
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: TripTemplate }) => (
    <TemplateFolderCard
      width={folderWidth}
      title={item.title}
      subtitle={t("template.overview.dayCount", { count: item.days_count })}
      countryCode={item.cities?.country_code}
      coverPhoto={item.cover_photo}
      seed={item.id}
      onPress={() =>
        // These are templates the signed-in user authored, not trips.
        navigation.navigate("TripDetail", {
          id: item.id,
          mode: TripDetailMode.Template,
          preview: { title: item.title, cover_photo: item.cover_photo },
        })
      }
      onLongPress={() => confirmDelete(item)}
    />
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.headerRow}>
        <Text color="foreground" variant="h1">
          {t("template.title")}
        </Text>
        <IconButton
          variant="filled"
          hitSlop={15}
          onPress={() => open({ target: "createTemplate" })}
          style={styles.addButton}
          icon={<PlusIcon width={24} height={24} color={colors.textPrimary} />}
        />
      </View>
      <FlatList
        data={templates ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          isLoading ? (
            <Spinner color="accent" />
          ) : error ? (
            <Text color="danger" variant="body">
              {error.message}
            </Text>
          ) : (
            <Text color="muted" variant="body">
              {t("template.empty")}
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}
