import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: theme.spacing(3),
  },
}));

export function LoginPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Manager
        </Typography>

        <Box mt={4}>
          <Button variant="contained" color="primary" fullWidth>
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
