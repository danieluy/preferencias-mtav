import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class Unit extends PureComponent {
  render() {
    const { classes, unit, units, onChange, onReset } = this.props;
    const priorities = units[`${unit.dorms}Priorities`].filter(p => !p.unit);
    const unitHasPriority = unit.priority !== -1;
    return (
      <div className={classes.unit}>
        <Typography
          variant="h6"
          align="center"
          color="primary"
        >
          {unit.id}
        </Typography>
        {!unitHasPriority
          ? (
            <TextField
              select
              label="Prioridad"
              value={-1}
              onChange={onChange(unit)}
              margin="normal"
              variant="outlined"
              className={classes.textField}
            >
              {priorities.map(p => <MenuItem key={p.id} value={p.id}>{p.id + 1}</MenuItem>)}
            </TextField>
          )
          : (
            <TextField
              label="Prioridad"
              variant="outlined"
              margin="normal"
              value={unit.priority + 1}
              className={classes.textField}
              type="search"
              onChange={onReset(unit)}
            />
          )
        }
      </div>
    );
  }
}

Unit.propTypes = {
  classes: PropTypes.object.isRequired,
  unit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    priority: PropTypes.number.isRequired,
    dorms: PropTypes.string.isRequired,
  }).isRequired,
  units: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

const UnitWithStyles = withStyles(styles)(Unit);
export default connect(mapStateToProps, mapDispatchToProps)(UnitWithStyles);

function mapStateToProps({ units }) {
  return {
    units,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: unit => (evt) => {
      const payload = {
        unit,
        priority: evt.target.value,
      };
      dispatch({ type: actions.UNIT_PRIORITY_CHANGE, payload });
    },
    onReset: unit => () => dispatch({ type: actions.RELEASE_PRIORITY, payload: unit }),
  };
}

function styles(theme) {
  return {
    unit: {
      position: 'relative',
      backgroundSolor: '#FFF',
      boxShadow: '0 5px 20px -5px rgba(0, 0, 0, .5)',
      margin: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      flexShrink: 0,
      padding: 10,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-arround',
      },
      [theme.breakpoints.up('md')]: {
        width: 100,
        height: 100,
        flexDirection: 'column',
      },
    },
    textField: {
      [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: 0,
        marginLeft: 10,
        height: 40,
      },
      [theme.breakpoints.up('md')]: {
        width: 80,
        marginTop: 10,
        marginBottom: 0,
      },
    },
  };
}
