import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/student';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [studentSelected, setStudentSelected] = useState<Student>();
  const isEdit = Boolean(studentId);

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

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Box mt={2}>
        <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
      </Box>
    </Box>
  );
}
