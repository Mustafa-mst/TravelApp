import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '@shared/components';
import { useAuthStore } from '../../store';
import { useLogoutMutation } from '../../hooks';
import type { RootStackParamList } from '@shared/navigation';
import { styles } from './AccountScreen.styles';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function AccountScreen() {
  const navigation = useNavigation<Navigation>();
  const session = useAuthStore((state) => state.session);
  const { mutate: logout, isPending } = useLogoutMutation();

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>Hesap</Text>
          <Text style={styles.prompt}>
            Devam etmek için giriş yapmalısın.
          </Text>
          <Button
            label="Giriş Yap"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{session.user.name}</Text>
        <Text style={styles.email}>{session.user.email}</Text>
        <Button
          label="Çıkış Yap"
          variant="secondary"
          loading={isPending}
          onPress={() => logout()}
        />
      </View>
    </SafeAreaView>
  );
}
