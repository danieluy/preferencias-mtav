import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import FamilyForm from '../Family/FamilyForm';
import Units from '../Units/Units';
import Family from '../Family/Family';
import Container from '../common/Container/Container';
import config from '../../config';
import { connect } from 'react-redux';
import { actions } from '../../redux';
// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends PureComponent {
  componentDidMount() {
    this.props.initAppState();
  }

  render() {
    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Preferencias MTAV
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className="app-wrapper">
          <Family />
          <FamilyForm />
          <Units />
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
