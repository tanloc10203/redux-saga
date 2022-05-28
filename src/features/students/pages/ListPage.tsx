import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { studentActions } from '../studentSlice';

export default function ListPage() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _limit: 15,
        _page: 1,
      })
    );
  }, [dispatch]);

  return <div>List Student Page</div>;
}
