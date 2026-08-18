import { memo, type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useStyles } from '@shared/hooks';
import { cardStyles } from './Card.styles';

type CardProps = {
  children: ReactNode;
} & ViewProps;

function CardComponent({ children, style, ...rest }: CardProps) {
  const styles = useStyles(cardStyles);

  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

export const Card = memo(CardComponent);
