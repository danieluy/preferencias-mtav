import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

class Priorities extends PureComponent {
  render() {
    const { classes, units, dorms } = this.props;
    if (!dorms)
      return (
        <Fragment>
          <Typography variant="h6">Lista de preferencias</Typography>
          <Typography>No se ha completado la información necesaria</Typography>
        </Fragment>
      );
    const priorities = units[`d${dorms}Priorities`];
    return (
      <Fragment>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell component="th">Prioridad</TableCell>
              <TableCell component="th">Unidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {priorities.map((piority) => {
              return (
                <TableRow key={piority.id}>
                  <TableCell>{piority.id + 1}</TableCell>
                  <TableCell>{piority.unit ? piority.unit.id : '-'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

Priorities.propTypes = {
  classes: PropTypes.object.isRequired,
  units: PropTypes.object.isRequired,
  dorms: PropTypes.number.isRequired,
};

const PrioritiesStyles = withStyles(styles)(Priorities);
export default connect(mapStateToProps, mapDispatchToProps)(PrioritiesStyles);

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
