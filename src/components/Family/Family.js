import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const Family = ({ classes, id, name, dorms, openForm }) => {
  return (
    <Card>
      <CardHeader
        title="Familia"
        subheader="Información"
        action={(
          <IconButton>
            <EditIcon onClick={openForm} />
          </IconButton>
        )}
      />
      <CardContent>
        {/* <TextLabel label="Número" value={id} />
        <TextLabel label="Nombre" value={name} />
        <TextLabel label="Dormitorios" value={dorms.toString()} /> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dormitorios</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{dorms}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

Family.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dorms: PropTypes.number.isRequired,
  openForm: PropTypes.func.isRequired,
};

const FamilyWithStyles = withStyles(styles)(Family);
export default connect(mapStateToProps, mapDispatchToProps)(FamilyWithStyles);

function mapStateToProps({ family }) {
  return {
    ...family,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openForm: () => dispatch({ type: actions.FAMILY_FORM_OPEN, payload: true }),
  };
}

function TextLabel({ label, value }) {
  return (
    <TextField
      label={label}
      value={value}
      margin="normal"
      variant="outlined"
      fullWidth
      disabled
    />
  );
}

TextLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function styles(theme) {
  return {
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  };
}
