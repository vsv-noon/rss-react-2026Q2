import * as z from 'zod';

export const userSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .refine((val) => val[0]?.toUpperCase() === val[0], {
        message: 'First letter must be uppercase',
      }),
    age: z
      .number({ message: 'Age must be number' })
      .refine((val) => !isNaN(val), { message: 'Age is required' })
      .nonnegative('Age cannot be negative'),
    email: z
      .string()
      .trim()
      .min(1, 'Email required')
      .refine(
        (val) => {
          const parts = val.split('@');
          if (parts.length !== 2) return false;

          const [local, domain] = parts;

          if (local.trim() === '') return false;

          if (!domain.includes('.')) return false;

          return true;
        },
        { message: 'Incorrect email format' }
      ),
    gender: z.enum(['male', 'female'], { error: 'Please select gender' }),
    country: z.string().trim().min(1, 'Country is required'),
    password: z
      .string()
      .refine((val) => /[a-z]/.test(val), {
        message: 'Must contain at least one lowercase letter',
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Must contain at least one uppercase letter',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Must contain at least one number',
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message: 'Must contain at least one special character',
      })
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm password'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept Terms and Conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type UserFormValues = z.infer<typeof userSchema>;
