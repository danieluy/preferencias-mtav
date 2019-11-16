import React, { PureComponent } from 'react';
import InputFile from 'ds-react-input-file';
import { download } from '../../utils';
import picture from './process-header-2.jpg';
import { Link } from 'react-router-dom';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class Bundler extends PureComponent {
  export = (data) => {
    download('preferencias.txt', JSON.stringify(data, null, 2));
  }

  render() {
    const { classes } = this.props;
    return (
      <InputFile onComplete={this.export} output="JSON" multiple>
        <div className={classes.input}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={picture}
                title="Exportar archivo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Arrastra los archivos aquí o haz click para seleccionarlos.
                </Typography>
                <Typography component="p">
                  Mediante esta herramienta se crea el archivo final de opciones para cargar en la aplicación MATV.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  <Link to="/family" className={classes.link}>
                    Crear archivo de familia
                  </Link>
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </div>
      </InputFile>
    );
  }
}

export default withStyles(styles)(Bundler);

function styles(theme) {
  return {
    input: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    media: {
      height: 300,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  };
}
