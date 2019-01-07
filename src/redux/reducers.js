import Unit from '../aux-classes/Unit';
import { Priority } from '../aux-classes';
import initialState from './initial-state';
import { store } from '../redux';

const INIT_APP_STATE = (state) => {
  const stored = loadStoredInfo();
  state = { ...stored };
  const complete = isFamilyInfoComplete(state);
  const open = !complete;
  state.familyForm = Object.assign({}, state.familyForm, { complete, open });
  return state;
};

const PATCH_FAMILY = (state, data) => {
  state.family = Object.assign({}, state.family, data);
  const complete = isFamilyInfoComplete(state);
  state.familyForm = Object.assign({}, state.familyForm, { complete });
  state.unsavedChanges = true;
  setBeforeUnloadListener(state.unsavedChanges);
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
  state.unsavedChanges = true;
  setBeforeUnloadListener(state.unsavedChanges);
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
  state.unsavedChanges = true;
  setBeforeUnloadListener(state.unsavedChanges);
  return state;
};

const IMPORT_FAMILY_DATA = (state, data) => {
  state = {
    ...state,
    ...data,
    familyForm: {
      complete: true,
      open: true,
    },
  };
  state.unsavedChanges = true;
  setBeforeUnloadListener(state.unsavedChanges);
  return state;
};

const OPEN_TAB_CHANGED = (state, tab) => {
  state.openTab = tab;
  return state;
};

const SAVE_FULL_STATE = (state) => {
  window.localStorage.setItem('FULL_STATE', JSON.stringify(state));
  state.unsavedChanges = false;
  setBeforeUnloadListener(state.unsavedChanges);
  return state;
};

export default {
  INIT_APP_STATE,
  PATCH_FAMILY,
  FAMILY_FORM_OPEN,
  UNIT_PRIORITY_CHANGE,
  RELEASE_PRIORITY,
  IMPORT_FAMILY_DATA,
  OPEN_TAB_CHANGED,
  SAVE_FULL_STATE,
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
function loadStoredInfo() {
  try {
    const stored = JSON.parse(localStorage.getItem('FULL_STATE'));
    return Object.assign(initialState, stored);
  }
  catch (err) {
    console.error(err);
    return initialState;
  }
}

let listening = false;
function setBeforeUnloadListener(set) {
  if (set && !listening) {
    window.addEventListener('beforeunload', handleBeforeunload);
    listening = true;
  }
  else if (listening) {
    window.removeEventListener('beforeunload', handleBeforeunload);
    listening = false;
  }
}

function handleBeforeunload(evt) {
  evt.preventDefault();
  evt.returnValue = '';
  return 'Hay cambios sin guardar, cerrar?';
}
