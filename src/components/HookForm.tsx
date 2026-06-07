import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import styles from './Form.module.scss';

import { userFields } from '@/constants/fields.config';
import { userSchema, type UserFormValues } from '@/schemas/user.schema';

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: UserFormValues) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>React Hook Form</h3>
      {userFields.map((field) => (
        <div className={styles.field} key={field.id}>
          <label>{field.label}</label>
          {field.type === 'select' ? (
            <select {...register(field.name)} defaultValue="">
              <option value="">Select</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...(field.type === 'number'
                ? { ...register(field.name, { valueAsNumber: true }) }
                : { ...register(field.name) })}
            />
          )}
          <p className={styles.error}>{errors[field.name]?.message}</p>
        </div>
      ))}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default HookForm;
