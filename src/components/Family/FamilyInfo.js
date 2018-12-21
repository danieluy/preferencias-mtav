import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';

const FamilyInfo = ({ classes, info, onEdit }) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        title="Familia"
        subheader="Información"
        action={
          <IconButton>
            <EditIcon onClick={onEdit} />
          </IconButton>
        }
      />
      <CardContent>
        <TextFieldCustom label="Número" value={info.id} />
        <TextFieldCustom label="Nombre" value={info.name} />
        <TextFieldCustom label="Dormitorios" value={info.dorms} />
      </CardContent>
    </Card>
  );
}

function TextFieldCustom({ label, value }) {
  return (
    <TextField
      label={label}
      value={value}
      margin="normal"
      variant="outlined"
      fullWidth
      disabled
    />
  )
}

FamilyInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dorms: PropTypes.number.isRequired,
  })
};

export default withStyles(styles)(FamilyInfo);

function styles(theme) {
  return {
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  };
};
