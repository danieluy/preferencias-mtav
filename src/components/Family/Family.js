import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

class Family extends PureComponent {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      dorms: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.checkLocalStorage = this.checkLocalStorage.bind(this);
  }

  componentDidMount() {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    try {
      const stored = JSON.parse(localStorage.getItem('FAMILY_INFO'))
      this.setState({ ...stored });
    }
    catch (err) {
      this.setState({
        id: '',
        name: '',
        dorms: '',
      })
    }
  }

  handleChange(evt) {
    const name = evt.currentTarget.getAttribute('name');
    const value = evt.currentTarget.value;
    this.setState({ [name]: value });
  }

  save() {
    const { id, name, dorms } = this.state;
    this.props.onChange({ id, name, dorms: parseInt(dorms) });
    localStorage.setItem('FAMILY_INFO', JSON.stringify(this.state));
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className="family-wrapper"
        open={true}
        onClose={this.handleClose}
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
            value={this.state.id}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            type="number"
            fullWidth
          />
          <TextField
            id="name"
            name="name"
            label="Nombre"
            value={this.state.name}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <RadioGroup
            aria-label="Cantidad de dormitorios"
            name="dorms"
            className={classes.group}
            value={this.state.dorms}
            onChange={this.handleChange}
          >
            <FormControlLabel value={'2'} control={<Radio />} label="2 dormitorios" />
            <FormControlLabel value={'3'} control={<Radio />} label="3 dormitorios" />
            <FormControlLabel value={'4'} control={<Radio />} label="4 dormitorios" disabled />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={this.save} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Family.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Family);

function styles(theme) {
  return {
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  };
};
