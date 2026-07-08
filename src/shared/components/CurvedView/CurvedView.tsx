import { memo, type ReactNode } from 'react';
import {
  ScrollView,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { styles } from './CurvedView.styles';

type CurvedViewProps = {
  children: ReactNode;
  scrollable?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
} & ViewProps;

function CurvedViewComponent({
  children,
  scrollable = false,
  contentStyle,
  style,
  ...rest
}: CurvedViewProps) {
  if (scrollable) {
    return (
      <View style={[styles.curved, style]} {...rest}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentStyle}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.curved, style]} {...rest}>
      {children}
    </View>
  );
}

export const CurvedView = memo(CurvedViewComponent);
