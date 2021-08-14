import React from 'react'
import { makeStyles, Grid, Paper, Typography, Divider } from '@material-ui/core'
import DropZone from '../src/components/DropZone'
const useStayles = makeStyles(theme => ({
  leftDiv: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
    padding: theme.spacing(2),
    height: '100%'
  },
  root: {
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      minHeight: '100vh',
      justifyContent: 'center'
    }
  },
  rightDiv: {
    padding: theme.spacing(2, 2),
    backgroundColor: 'transparent',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start'
    }
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(5, 0)
  }
}))
export default function Index() {
  const classes = useStayles()
  return (
    <>
      <Grid container spacing={0} className={classes.root}>
        <Grid
          item
          xs={10}
          sm={8}
          container
          justifyContent="center"
          alignItems="stretch"
        >
          <DropZone />
        </Grid>
        <Grid
          item
          xs={10}
          sm={4}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={0} className={classes.rightDiv}>
            <Typography
              variant="h4"
              component="h1"
              color="secondary"
              align="center"
            >
              Bienvenido a DDrop
            </Typography>
            <Typography
              variant="body2"
              component="h2"
              color="secondary"
              align="left"
              gutterBottom
            >
              Para subir tus archivos de forma simple a drive, puedes hacer
              LogIn a través de Google.
            </Typography>
            <Divider varinat="fullWidth" className={classes.divider} />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
