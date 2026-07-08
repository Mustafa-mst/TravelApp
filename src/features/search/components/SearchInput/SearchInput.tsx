import React from "react";
import { styles } from "./SearchInput.styles";
import { Input } from "@shared/components";
import { ArrowLeftIcon } from "@shared/assets/icons";

const SearchInputComponent = () => {
  return (
    <Input
      containerStyle={styles.container}
      leftIcon={<ArrowLeftIcon />}
      placeholder="Search"
    />
  );
};

export const SearchInput = React.memo(SearchInputComponent);
