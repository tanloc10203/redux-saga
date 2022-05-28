import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Widget({ title, children }: WidgetProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>

      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
