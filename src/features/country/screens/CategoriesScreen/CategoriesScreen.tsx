import { View } from "react-native";
import { BackPanel, useBackLayer } from "react-native-layer-stack";

import { Text } from "@shared/components";
import { BackLayerTitle } from "@/shared/components/BackLayerTitle";
import { HomeIcon } from "@/shared/assets/icons";
import { styles } from "./CategoriesScreen.styles";

type CategoriesScreenProps = {
  category: string;
};

export function CategoriesScreen({ category }: CategoriesScreenProps) {
  const { close } = useBackLayer();

  return (
    <BackPanel>
      <View style={styles.container}>
        <BackLayerTitle
          icon={<HomeIcon width={27} height={27} />}
          title={category}
          onPress={close}
        />
      </View>
    </BackPanel>
  );
}
