import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Unit from './Unit';
// Material UI
import { withStyles } from '@material-ui/core/styles';

class Floor extends PureComponent {
  state = {};

  render() {
    const { classes, units, floor } = this.props;
    window.units = units;
    return (
      <div id={`floor-${floor}`} className={classes.floor}>
        {units.map(unit => <Unit key={unit.unit} data={unit} />)}
      </div>
    );
  }
}

Floor.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.arrayOf(PropTypes.object).isRequired,
  floor: PropTypes.string.isRequired,
};

export default withStyles(styles)(Floor);

function styles(theme) {
  return {
    floor: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    }
  };
};