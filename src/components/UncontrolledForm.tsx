import { useState, type SubmitEvent } from 'react';

import styles from './Form.module.scss';

import { userFields } from '@/constants/fields.config';
import { userSchema } from '@/schemas/user.schema';

function UncontrolledForm() {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalErrors({});

    const formData = new FormData(e.currentTarget);

    const data: Record<string, unknown> = {};

    userFields.forEach((field) => {
      if (field.type === 'checkbox') {
        data[field.name] = formData.get(field.name) === 'on';
      } else if (field.type === 'number') {
        data[field.name] = Number(formData.get(field.name));
      } else {
        data[field.name] = formData.get(field.name);
      }
    });

    const result = userSchema.safeParse(data);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0])
          formattedErrors[issue.path[0].toString()] = issue.message;
      });
      setLocalErrors(formattedErrors);
      return;
    }

    console.log('Uncontrolled Form Data:', result.data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Uncontrolled Form</h3>
      {userFields.map((field) => (
        <div className={styles.field} key={field.id}>
          <label>{field.label}</label>
          {field.type === 'select' ? (
            <select name={field.name} defaultValue="">
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
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            />
          )}
          <p className={styles.error}>{localErrors[field.name]}</p>
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
