import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useStyles } from '@shared/hooks';
import { LoginForm } from '../../components';
import { useLoginMutation } from '../../hooks';
import { loginScreenStyles } from './LoginScreen.styles';

export function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { form, onSubmit, isSubmitting } = useLoginMutation({
    onSuccess: () => navigation.goBack(),
  });
  const styles = useStyles(loginScreenStyles);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('auth.loginTitle')}</Text>
        <LoginForm form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </View>
    </SafeAreaView>
  );
}
