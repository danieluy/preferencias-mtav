import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Unit from './Unit';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class Floor extends PureComponent {
  state = {};

  render() {
    const { classes, units, floor } = this.props;
    window.units = units;
    return (
      <div id={`floor-${floor}`} className={classes.floor}>
        {floor > 0 && (
          <Typography variant="h6" color="secondary" className={classes.title}>{floor / 100}</Typography>
        )}
        {units.map(unit => <Unit key={unit.id} unit={unit} />)}
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
  console.log(theme)
  return {
    floor: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    title: {
      width: 40,
      height: 40,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      boxShadow: '0 5px 20px -5px rgba(0, 0, 0, .5)',
    },
  };
}
