import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
import FamilyForm from '../Family/FamilyForm';
import Units from '../Units/Units';
import Priorities from '../Priority/Priorities';
import Container from '../common/Container/Container';
import AppBar from '../AppBar/AppBar';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

class App extends PureComponent {
  componentDidMount() {
    this.props.initAppState();
  }

  render() {
    const { classes, openTab } = this.props;
    return (
      <Fragment>
        <AppBar />
        <Container className="app-wrapper">
          <Grid container spacing={24} className={classes.xs}>
            <Grid item xs={12}>
              {openTab === 0 && (
                <Units />
              )}
            </Grid>
            <Grid item xs={12}>
              {openTab === 1 && (
                <Priorities />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={24} className={classes.md}>
            <Grid item xs={9}>
              <Units />
            </Grid>
            <Grid item xs={3}>
              <Priorities />
            </Grid>
          </Grid>
        </Container>
        <FamilyForm />
      </Fragment>
    );
  }
}

App.propTypes = {
  openTab: PropTypes.number.isRequired,
  initAppState: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const AppWithStyles = withStyles(styles)(App);
export default connect(mapStateToProps, mapDispatchToProps)(AppWithStyles);

function mapStateToProps({ openTab }) {
  return { openTab };
}

function mapDispatchToProps(dispatch) {
  return {
    initAppState: () => dispatch({ type: actions.INIT_APP_STATE }),
  };
}

function styles(theme) {
  console.log(theme);
  return {
    xs: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    md: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  };
}
