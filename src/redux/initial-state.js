import config from '../config';
import { Unit, Priority } from '../aux-classes';

export default {
  family: {
    id: '',
    name: '',
    dorms: 0,
  },
  familyForm: {
    complete: true,
    open: false,
  },
  units: formatUnits(config.units),
  openTab: 0,
};

function formatUnits(units) {
  return {
    d2: units.d2.map(unit => new Unit(unit, 2)),
    d2Priorities: units.d2.map((u, i) => new Priority(i, 2)),
    d3: units.d3.map(unit => new Unit(unit, 3)),
    d3Priorities: units.d3.map((u, i) => new Priority(i, 3)),
    d4: units.d4.map(unit => new Unit(unit, 4)),
    d4Priorities: units.d4.map((u, i) => new Priority(i, 4)),
    total: units.total,
    valid: validateUnitsConfig(units),
  };
}

function validateUnitsConfig(units) {
  const totalOk = units.d2.length + units.d3.length + units.d4.length === units.total;
  if (!totalOk)
    return {
      status: false,
      message: 'La cantidad de apartamentos no coincide con el total declarado.',
    };
  return {
    status: true,
    message: null,
  };
}
