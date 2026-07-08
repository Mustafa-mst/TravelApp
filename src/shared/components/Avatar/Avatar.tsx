import { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './Avatar.styles';

type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
  uri?: string;
  fallback?: string;
  size?: AvatarSize;
};

function AvatarComponent({ uri, fallback, size = 'md' }: AvatarProps) {
  if (uri) {
    return <Image source={{ uri }} style={styles[size]} />;
  }

  return (
    <View style={[styles[size], styles.fallback]}>
      <Text style={styles.fallbackText}>
        {fallback?.charAt(0).toUpperCase() ?? '?'}
      </Text>
    </View>
  );
}

export const Avatar = memo(AvatarComponent);
