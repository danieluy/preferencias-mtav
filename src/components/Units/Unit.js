import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

class Unit extends PureComponent {
  state = {};

  render() {
    const { classes, data: { unit, priority } } = this.props;
    return (
      <div className={classes.unit}>
        <Typography
          variant="h4"
          align="center">
          {unit}
        </Typography>
        <input
          className={classes.input}
          value={priority}
          type="number"
          onChange={evt => console.log(unit, parseInt(evt.target.value))} // TODO solve with Redux
        />
      </div>
    );
  }
}

Unit.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    unit: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
  }),
};

export default withStyles(styles)(Unit);

function styles(theme) {
  console.log(theme)
  return {
    unit: {
      position: 'relative',
      width: 100,
      height: 100,
      backgroundSolor: '#FFF',
      boxShadow: '0 5px 20px -5px rgba(0, 0, 0, .5)',
      margin: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 10,
      flexShrink: 0,
    },
    input: {
      ...theme.typography.h5,
      width: '100%',
      background: 'none',
      border: 'none',
      textAlign: 'center',
    },
  };
};