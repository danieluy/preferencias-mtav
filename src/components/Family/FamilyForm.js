import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class FamilyForm extends PureComponent {
  save = () => {
    // const { family } = this.props;
    // localStorage.setItem('FAMILY_INFO', JSON.stringify(family));
    this.props.onClose();
  }

  render() {
    const { classes, family: { id, name, dorms }, open, complete, onChange } = this.props;
    return (
      <Dialog
        className="family-wrapper"
        open={open || !complete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Familia</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ingrese los datos solicitados.
          </DialogContentText>
          <TextField
            id="id"
            name="id"
            label="Nº"
            value={id}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            type="number"
            fullWidth
          />
          <TextField
            id="name"
            name="name"
            label="Nombre"
            value={name}
            onChange={onChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <RadioGroup
            aria-label="Cantidad de dormitorios"
            name="dorms"
            className={classes.group}
            value={dorms.toString()}
            onChange={onChange}
          >
            <FormControlLabel value="2" control={<Radio />} label="2 dormitorios" />
            <FormControlLabel value="3" control={<Radio />} label="3 dormitorios" />
            <FormControlLabel value="4" control={<Radio />} label="4 dormitorios" disabled />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={this.save} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FamilyForm.propTypes = {
  classes: PropTypes.object.isRequired,
  family: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    dorms: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
};

const FamilyFormWithStyles = withStyles(styles)(FamilyForm);
export default connect(mapStateToProps, mapDispatchToProps)(FamilyFormWithStyles);

function mapStateToProps({ family, familyForm: { open, complete } }) {
  return {
    family,
    open,
    complete,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (evt) => {
      const name = evt.currentTarget.getAttribute('name');
      const value = evt.currentTarget.value;
      const payload = { [name]: value };
      if (name === 'dorms')
        payload.dorms = parseInt(payload.dorms, 10);
      dispatch({ type: actions.PATCH_FAMILY, payload });
    },
    onClose: () => dispatch({ type: actions.FAMILY_FORM_OPEN, payload: false }),
  };
}

function styles(theme) {
  return {
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  };
}
