import React from "react";
import { Image, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ChevronRightIcon, CloseIcon } from "@shared/assets/icons";
import { IconButton, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import { resolveCountryName } from "@shared/utils/country";
import { searchResultListStyles } from "./SearchResultList.styles";
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
  const styles = useStyles(searchResultListStyles);
  const colors = useThemeColors();

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
          <Text variant="bodyLargeMedium" color="foreground">
            {name}
          </Text>
          {area ? (
            <Text variant="body" color="muted">
              {area}
            </Text>
          ) : null}
        </View>
      </View>
      {onRemove ? (
        <IconButton
          icon={<CloseIcon width={20} height={20} color={colors.muted} />}
          onPress={onRemove}
        />
      ) : (
        <ChevronRightIcon width={20} height={20} color={colors.muted} />
      )}
    </Pressable>
  );
};

export const CountryRow = React.memo(CountryRowComponent);
