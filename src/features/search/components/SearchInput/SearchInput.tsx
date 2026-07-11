import React from "react";
import { useTranslation } from "react-i18next";
import { styles } from "./SearchInput.styles";
import { Input } from "@shared/components";
import { ArrowLeftIcon } from "@shared/assets/icons";

const SearchInputComponent = () => {
  const { t } = useTranslation();

  return (
    <Input
      containerStyle={styles.container}
      leftIcon={<ArrowLeftIcon />}
      placeholder={t("search.placeholder")}
    />
  );
};

export const SearchInput = React.memo(SearchInputComponent);
