import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { dashboardActions, dashboardState } from './dashboardSlice';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { loading, highestStudentList, lowestStudentList, rankingByCityList, statistics } =
    useAppSelector(dashboardState);

  console.log({ loading, highestStudentList, lowestStudentList, rankingByCityList, statistics });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return <div>Dashboard</div>;
}
