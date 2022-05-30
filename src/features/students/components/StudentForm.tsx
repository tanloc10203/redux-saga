import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

const schemaStudent = yup
  .object({
    name: yup
      .string()
      .required()
      .test('two-words', 'Please enter at least two words', (value) =>
        !value ? true : value.split(' ').filter((x) => !!x).length >= 2
      ),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .min(18, 'Min is 18 age')
      .max(60, 'Max is 60 age')
      .required('Please enter age')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .positive('Please enter a positive number.')
      .min(0, 'Min is 0 mark')
      .max(10, 'Max is 10 mark')
      .required('Please enter mark')
      .typeError('Please enter a valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female')
      .required('Please select gender'),
    city: yup.string().required('Please select city'),
  })
  .required();

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValue: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaStudent),
  });

  const handleStudentOnSubmit = async (formValue: Student) => {
    try {
      setError('');
      await onSubmit?.(formValue);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        console.log('Error', error);
      }
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleStudentOnSubmit)}>
        {error && <Alert severity="error">{error}</Alert>}

        <InputField name="name" control={control} label="Full Name" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        <InputField name="age" control={control} label="Age" type="number" />

        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        <Box mt={1}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
