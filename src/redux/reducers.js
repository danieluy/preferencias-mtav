import Unit from '../aux-classes/Unit';
import { Priority } from '../aux-classes';

const INIT_APP_STATE = (state) => {
  const { id, name, dorms } = loadFamilyInfo();
  state.family = Object.assign({}, state.family, { id, name, dorms });
  const complete = isFamilyInfoComplete(state);
  const open = !complete;
  state.familyForm = Object.assign({}, state.familyForm, { complete, open });
  return state;
};

const PATCH_FAMILY = (state, data) => {
  state.family = Object.assign({}, state.family, data);
  const complete = isFamilyInfoComplete(state);
  state.familyForm = Object.assign({}, state.familyForm, { complete });
  return state;
};

const FAMILY_FORM_OPEN = (state, open) => {
  state.familyForm = Object.assign({}, state.familyForm, { open });
  return state;
};

const UNIT_PRIORITY_CHANGE = (state, payload) => {
  const { unit, priority } = payload;
  let newUnit;
  const units = state.units[unit.dorms].map((u) => {
    if (u.id === unit.id) {
      newUnit = new Unit(unit.id, null, priority);
      newUnit.dorms = unit.dorms;
      return newUnit;
    }
    return u;
  });
  const priorities = state.units[`${newUnit.dorms}Priorities`].map((p) => {
    if (p.id === priority) {
      const newPriority = new Priority(p.id, null, newUnit);
      newPriority.dorms = p.dorms;
      return newPriority;
    }
    return p;
  });
  state.units = Object.assign({}, state.units, {
    [unit.dorms]: units,
    [`${unit.dorms}Priorities`]: priorities,
  });
  return state;
};

const RELEASE_PRIORITY = (state, unit) => {
  const units = state.units[unit.dorms].map((u) => {
    if (u.id === unit.id) {
      const newUnit = new Unit(unit.id, null, -1);
      newUnit.dorms = unit.dorms;
      return newUnit;
    }
    return u;
  });
  const priorities = state.units[`${unit.dorms}Priorities`].map((p) => {
    if (p.id === unit.priority) {
      const newPriority = new Priority(p.id, null, null);
      newPriority.dorms = p.dorms;
      return newPriority;
    }
    return p;
  });
  state.units = Object.assign({}, state.units, {
    [unit.dorms]: units,
    [`${unit.dorms}Priorities`]: priorities,
  });
  return state;
};

export default {
  INIT_APP_STATE,
  PATCH_FAMILY,
  FAMILY_FORM_OPEN,
  UNIT_PRIORITY_CHANGE,
  RELEASE_PRIORITY,
};

/**
 * Defines whether the Family info in complete
 * @param {Boolean} state
 */
function isFamilyInfoComplete(state) {
  return !!(state.family.id && state.family.name && state.family.dorms);
}

/**
 * Retrieves the family info from local storage
 */
function loadFamilyInfo() {
  const family = {
    id: '',
    name: '',
    dorms: 0,
  };
  try {
    const stored = JSON.parse(localStorage.getItem('FAMILY_INFO'));
    return stored || family;
  }
  catch (err) {
    console.error(err);
    return family;
  }
}
