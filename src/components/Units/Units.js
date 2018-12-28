import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Floor from './Floor';
// Material UI
import { withStyles } from '@material-ui/core/styles';

class Units extends PureComponent {
  state = {};

  onChange = (unit, value) => {
    console.log({ unit, value });
  };

  render() {
    const { classes, units } = this.props;
    const unitsByFloor = separateUnitsByFloor(units);
    const floors = Object.keys(unitsByFloor);
    return (
      <Fragment>
        {floors.reverse().map((floor) => <Floor key={floor} units={unitsByFloor[floor]} floor={(floor)} />)}
      </Fragment>
    );
  }
}

Units.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Units);

function styles(theme) {
  return {};
};



function separateUnitsByFloor(units) {
  let controlUnits = units.slice();
  const unitsByFloor = {};
  while (controlUnits.length) {
    const unit = controlUnits.splice(0, 1)[0];
    const floor = findFloor(0, 100, unit.unit);
    if (!unitsByFloor[floor])
      unitsByFloor[floor] = [];
    unitsByFloor[floor].push(unit);
  }
  return unitsByFloor;
}

function findFloor(start, end, unit) {
  if (unit < end)
    return start;
  return findFloor(end, end + 100, unit);
}