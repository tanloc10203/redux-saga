import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { StatisticsItem } from './components/StatisticsItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, dashboardState } from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },

  title: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { loading, highestStudentList, lowestStudentList, rankingByCityList, statistics } =
    useAppSelector(dashboardState);

  console.log({ loading, highestStudentList, lowestStudentList, rankingByCityList, statistics });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            value={statistics.maleCount}
            label="male"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            value={statistics.femaleCount}
            label="male"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            value={statistics.highMarkCount}
            label="mark >= 8"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<LinearScaleSharp fontSize="large" color="primary" />}
            value={statistics.lowMarkCount}
            label="mark <= 5"
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4" className={classes.title}>
          All Students
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Widget title="Student with highest mark">
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Grid>

          <Grid item xs={12} md={6}>
            <Widget title="Student with lowest mark">
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" className={classes.title}>
          Rankings By City
        </Typography>

        <Grid container spacing={3}>
          {rankingByCityList.map((ranking) => (
            <Grid key={ranking.cityId} item xs={12} md={6}>
              <Widget title={ranking.cityName}>
                <StudentRankingList studentList={ranking.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
