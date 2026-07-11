import { z } from 'zod';
import i18n from '@shared/i18n';

export const loginSchema = z.object({
  email: z.email({ error: () => i18n.t('auth.errors.email') }),
  password: z.string().min(8, { error: () => i18n.t('auth.errors.passwordMin') }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
