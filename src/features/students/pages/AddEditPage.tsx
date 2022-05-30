import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/student';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [studentSelected, setStudentSelected] = useState<Student>();
  const isEdit = Boolean(studentId);
  const history = useHistory();

  const initialValues: Student = {
    name: '',
    mark: '',
    gender: 'male',
    age: '',
    city: '',
    ...studentSelected,
  } as Student;

  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudentSelected(response);
      } catch (error) {
        console.log('GET STUDENT BY ID FAILED !!!', error);
      }
    })();
  }, [studentId]);

  console.log('check student selected update', studentSelected);

  const handleStudentOnSubmit = async (formValue: Student) => {
    if (isEdit) {
      await studentApi.update(formValue);
    } else {
      await studentApi.add(formValue);
    }

    const message: string = isEdit
      ? 'Save is student update success'
      : 'Save is student add success';
    toast.success(message);

    history.push('/admin/students');
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Box mt={1}>
        <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
      </Box>

      {(!isEdit || Boolean(studentSelected)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentOnSubmit} />
        </Box>
      )}
    </Box>
  );
}
