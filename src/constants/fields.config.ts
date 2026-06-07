export type Name =
  | 'name'
  | 'age'
  | 'email'
  | 'gender'
  | 'country'
  | 'password'
  | 'confirmPassword'
  | 'acceptTerms';

export type FieldOption = {
  value: string;
  label: string;
};

export type FieldConfig = {
  id: string;
  name: Name;
  label: string;
  type: 'text' | 'number' | 'password' | 'email' | 'checkbox' | 'select';
  placeholder?: string;
  options?: FieldOption[];
};

export const userFields: FieldConfig[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Name',
  },
  {
    id: 'age',
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: 'Age',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'example@mail.com',
  },
  {
    id: 'gender',
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      {
        value: 'male',
        label: 'male',
      },
      {
        value: 'female',
        label: 'female',
      },
    ],
  },
  {
    id: 'country',
    name: 'country',
    label: 'country',
    type: 'text',
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
  },
  {
    id: 'acceptTerms',
    name: 'acceptTerms',
    label: 'Accept Term & Conditions',
    type: 'checkbox',
  },
];
