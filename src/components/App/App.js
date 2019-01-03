import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import FamilyForm from '../Family/FamilyForm';
import Units from '../Units/Units';
import Container from '../common/Container/Container';
import { connect } from 'react-redux';
import { actions } from '../../redux';
import AppBar from '../AppBar/AppBar';

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
