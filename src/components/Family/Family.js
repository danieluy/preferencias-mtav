import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
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
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';

class Family extends PureComponent {
  state = {
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, id, name, dorms, openForm } = this.props;
    return (
      <Card>
        <CardHeader
          title="Familia"
          action={(
            <IconButton>
              <EditIcon onClick={openForm} />
            </IconButton>
          )}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classNames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Más"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextLabel label="Número" value={id} />
            <TextLabel label="Nombre" value={name} />
            <TextLabel label="Dormitorios" value={dorms.toString()} />
            {/* <Table>
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
            </Table> */}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

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
      InputProps={{
        readOnly: true,
      }}
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
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      expandOpen: {
        transform: 'rotate(180deg)',
      },
    },
  };
}
