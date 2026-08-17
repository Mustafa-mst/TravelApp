import React from "react";
import { Image, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, CloseIcon } from "@shared/assets/icons";
import { IconButton, Text } from "@shared/components";
import { colors } from "@shared/styles";
import { resolveCountryName } from "@shared/utils/country";
import { styles } from "./SearchResultList.styles";
import type { CountrySearchResult } from "../../types";

type CountryRowProps = {
  country: CountrySearchResult;
  onPress: () => void;
  onRemove?: () => void;
};

const CountryRowComponent = ({
  country,
  onPress,
  onRemove,
}: CountryRowProps) => {
  const { i18n } = useTranslation();

  const name = resolveCountryName(country.name, i18n.language, country.cca2);
  const area = country.subregion ?? country.region;

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.resultInfo}>
        {country.flags?.png ? (
          <Image source={{ uri: country.flags.png }} style={styles.flag} />
        ) : null}
        <View>
          <Text variant="bodyMedium" color="text">
            {name}
          </Text>
          {area ? (
            <Text variant="caption" color="textMuted">
              {area}
            </Text>
          ) : null}
        </View>
      </View>
      {onRemove ? (
        <IconButton
          icon={
            <CloseIcon width={18} height={18} color={colors.iconSecondary} />
          }
          onPress={onRemove}
        />
      ) : (
        <ChevronRightIcon width={18} height={18} color={colors.iconSecondary} />
      )}
    </Pressable>
  );
};

export const CountryRow = React.memo(CountryRowComponent);
