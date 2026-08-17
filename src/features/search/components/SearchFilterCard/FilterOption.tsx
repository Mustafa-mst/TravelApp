import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Radio, Text } from "@shared/components";
import { colors } from "@shared/styles";
import type { OptionItemType } from "@shared/types";
import { REGION_ICON_SIZE, styles } from "./SearchFilterCard.styles";
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
          color={isSelected ? colors.primary : colors.iconSecondary}
        />
      ) : null}
      <Text
        variant="bodyMedium"
        color={isSelected ? "primary" : "text"}
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
