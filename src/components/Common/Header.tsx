import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export function Header() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <div className={classes.root}>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(authActions.logout());
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* </Box> */}
    </div>
  );
}
