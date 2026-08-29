import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Radio, Text } from "@shared/components";
import { useStyles, useThemeColors } from "@shared/hooks";
import type { OptionItemType } from "@shared/types";
import {
  REGION_ICON_SIZE,
  searchFilterCardStyles,
} from "./SearchFilterCard.styles";
import type { SearchFilters } from "../../types";

type FilterOptionProps<T extends string> = {
  option: OptionItemType<T>;
  filterKey: keyof SearchFilters;
  isSelected: boolean;
  isFirst: boolean;
  onToggle: (key: keyof SearchFilters, id: string) => void;
};

function FilterOptionComponent<T extends string>({
  option,
  filterKey,
  isSelected,
  isFirst,
  onToggle,
}: FilterOptionProps<T>) {
  const { t } = useTranslation();
  const styles = useStyles(searchFilterCardStyles);
  const colors = useThemeColors();

  const handleSelectedChange = useCallback(() => {
    onToggle(filterKey, option.value);
  }, [filterKey, onToggle, option.value]);

  return (
    <Radio
      isSelected={isSelected}
      onSelectedChange={handleSelectedChange}
      indicatorPosition="end"
      deselectable
      style={[styles.option, !isFirst && styles.optionDivider]}
    >
      {option.Icon ? (
        <option.Icon
          width={REGION_ICON_SIZE}
          height={REGION_ICON_SIZE}
          color={isSelected ? colors.accent : colors.muted}
        />
      ) : null}
      <Text
        variant="bodyMedium"
        color={isSelected ? "accent" : "foreground"}
        style={styles.optionLabel}
      >
        {t(option.labelKey)}
      </Text>
    </Radio>
  );
}

export const FilterOption = memo(
  FilterOptionComponent,
) as typeof FilterOptionComponent;
