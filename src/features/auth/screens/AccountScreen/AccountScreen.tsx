import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Button } from '@shared/components';
import { useStyles } from '@shared/hooks';
import { useAuthStore } from '../../store';
import { useLogoutMutation } from '../../hooks';
import type { RootStackParamList } from '@shared/navigation';
import { accountScreenStyles } from './AccountScreen.styles';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function AccountScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Navigation>();
  const session = useAuthStore((state) => state.session);
  const { mutate: logout, isPending } = useLogoutMutation();
  const styles = useStyles(accountScreenStyles);

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('auth.accountTitle')}</Text>
          <Text style={styles.prompt}>
            {t('auth.loginPrompt')}
          </Text>
          <Button
            label={t('auth.login')}
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
          label={t('auth.logout')}
          variant="secondary"
          isLoading={isPending}
          onPress={() => logout()}
        />
      </View>
    </SafeAreaView>
  );
}
