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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class App extends PureComponent {
  componentDidMount() {
    this.props.initAppState();
  }

  render() {
    return (
      <Fragment>
        <AppBar />
        <Container className="app-wrapper">
          <FamilyForm />
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <Units />
            </Grid>
            <Grid item xs={3}>
              <Priorities />
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

App.propTypes = {
  initAppState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

function mapStateToProps({ familyForm }) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    initAppState: () => dispatch({ type: actions.INIT_APP_STATE }),
  };
}
