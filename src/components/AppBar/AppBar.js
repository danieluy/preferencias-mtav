import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/PlaylistAddCheckOutlined';

const AppBarCustom = ({ classes, family, openFamilyFrom }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuIcon fontSize="large" className={classes.menuButton} />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Preferencias MTAV
          </Typography>
          <Button color="inherit" onClick={openFamilyFrom}>
            {`#${family.id} ${family.name} - ${family.dorms}D`}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

AppBarCustom.propTypes = {
  family: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    dorms: PropTypes.number,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  openFamilyFrom: PropTypes.func.isRequired,
};

const AppBarCustomWithStyles = withStyles(styles)(AppBarCustom);
export default connect(mapStateToProps, mapDispatchToProps)(AppBarCustomWithStyles);

function mapStateToProps({ family }) {
  return {
    family,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openFamilyFrom: () => dispatch({ type: actions.FAMILY_FORM_OPEN, payload: true }),
  };
}

function styles(theme) {
  return {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 20,
    },
  };
}
