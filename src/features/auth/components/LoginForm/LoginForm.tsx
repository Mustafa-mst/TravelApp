import { memo } from "react";
import { View } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@shared/components";
import type { LoginFormValues } from "../../schemas";
import { styles } from "./LoginForm.styles";

type LoginFormProps = {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: () => void;
  isSubmitting: boolean;
};

function LoginFormComponent({ form, onSubmit, isSubmitting }: LoginFormProps) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={t("auth.email")}
            placeholder={t("auth.emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            label={t("auth.password")}
            placeholder={t("auth.passwordPlaceholder")}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect={false}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <Button
        label={t("auth.login")}
        loading={isSubmitting}
        onPress={onSubmit}
      />
    </View>
  );
}

export const LoginForm = memo(LoginFormComponent);
