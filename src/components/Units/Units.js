import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Floor from './Floor';
import { connect } from 'react-redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';

class Units extends PureComponent {
  render() {
    const { classes, units, dorms } = this.props;
    if (!dorms)
      return <h1>No se ha completado la información necesaria</h1>;
    const allowedUnits = units[`d${dorms}`];
    const unitsByFloor = separateUnitsByFloor(allowedUnits);
    const floors = Object.keys(unitsByFloor);
    return (
      <Fragment>
        {floors.reverse().map(floor => <Floor key={floor} units={unitsByFloor[floor]} floor={(floor)} />)}
      </Fragment>
    );
  }
}

Units.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.object.isRequired,
  dorms: PropTypes.number.isRequired,
};

const UnitsWithStyles = withStyles(styles)(Units);
export default connect(mapStateToProps, mapDispatchToProps)(UnitsWithStyles);

function mapStateToProps({ units, family: { dorms } }) {
  return {
    units,
    dorms,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

function styles(theme) {
  return {};
}

function separateUnitsByFloor(units) {
  const controlUnits = units.slice();
  const unitsByFloor = {};
  while (controlUnits.length) {
    const unit = controlUnits.splice(0, 1)[0];
    const floor = findFloor(0, 100, unit.id);
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
