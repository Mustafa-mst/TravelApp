import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LoginForm } from '../../components';
import { useLoginMutation } from '../../hooks';
import { styles } from './LoginScreen.styles';

export function LoginScreen() {
  const navigation = useNavigation();
  const { form, onSubmit, isSubmitting } = useLoginMutation({
    onSuccess: () => navigation.goBack(),
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Giriş Yap</Text>
        <LoginForm form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      </View>
    </SafeAreaView>
  );
}
