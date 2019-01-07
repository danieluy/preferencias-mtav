import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../redux';
import { download } from '../../utils';
import InputFile from 'ds-react-input-file';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import ImportExportIcon from '@material-ui/icons/ImportExportOutlined';

class AppBarCustom extends PureComponent {
  state = {
    anchorEl: null,
  };

  closeImportExportMenu = () => {
    this.setState({ anchorEl: null });
  };

  openImportExportMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  export = () => {
    const { family, units } = this.props;
    download(`${family.id}`, JSON.stringify({ family, units }, null, 2));
    this.closeImportExportMenu();
  }

  handleTabChange = (event, tab) => {
    const { changeTab } = this.props;
    changeTab(tab);
  };

  render() {
    const { anchorEl, tab } = this.state;
    const { classes, family, openFamilyFrom, importData, openTab } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <PlaylistAddCheckIcon fontSize="large" className={classes.menuButton} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Preferencias MTAV
            </Typography>

            <Fragment>
              <Tooltip title="Importar/Exportar" aria-label="Importar/Exportar">
                <IconButton color="inherit" onClick={this.openImportExportMenu}>
                  <ImportExportIcon color="inherit" />
                </IconButton>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeImportExportMenu}
              >
                <InputFile
                  output="JSON"
                  onComplete={(json) => {
                    importData(json);
                    this.closeImportExportMenu();
                  }}
                >
                  <MenuItem>Importar</MenuItem>
                </InputFile>
                <MenuItem onClick={this.export}>Exportar</MenuItem>
              </Menu>
            </Fragment>

            <Tooltip title="Guardar" aria-label="Guardar">
              <IconButton color="inherit" onClick={() => { }}>
                <SaveIcon color="inherit" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Editar información" aria-label="Editar información">
              <Button color="inherit" onClick={openFamilyFrom}>
                {`#${family.id} ${family.name} - ${family.dorms}D`}
              </Button>
            </Tooltip>
          </Toolbar>

          <Tabs value={openTab} onChange={this.handleTabChange} className={classes.tabs}>
            <Tab label="Selección" />
            <Tab label="Lista" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
};

AppBarCustom.propTypes = {
  family: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    dorms: PropTypes.number,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  units: PropTypes.object.isRequired,
  openFamilyFrom: PropTypes.func.isRequired,
  importData: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  openTab: PropTypes.number.isRequired,
};

const AppBarCustomWithStyles = withStyles(styles)(AppBarCustom);
export default connect(mapStateToProps, mapDispatchToProps)(AppBarCustomWithStyles);

function mapStateToProps({ family, units, openTab }) {
  return {
    family,
    units,
    openTab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openFamilyFrom: () => dispatch({ type: actions.FAMILY_FORM_OPEN, payload: true }),
    importData: data => dispatch({ type: actions.IMPORT_FAMILY_DATA, payload: data }),
    changeTab: tab => dispatch({ type: actions.OPEN_TAB_CHANGED, payload: tab }),
  };
}

function styles(theme) {
  return {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 20,
    },
    tabs: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    }
  };
}
