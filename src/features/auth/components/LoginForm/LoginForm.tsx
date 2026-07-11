import { memo } from "react";
import { View } from "react-native";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@shared/components";
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
          <Input
            label={t("auth.email")}
            keyboardType="email-address"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t("auth.password")}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
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
