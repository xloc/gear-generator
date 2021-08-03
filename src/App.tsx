import React from 'react';
import { Svg } from '@svgdotjs/svg.js';
import _ from 'lodash';
import { InvoluteGear2D } from './geometry/involute_gear';
import { Drawer, List, ListItem, makeStyles, TextField } from '@material-ui/core';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {

  const classes = useStyles();

  let gear_params = {
    n_teeth: 18,
    module: 1,
    pressure_angle_deg: 20,
    stretch_ratio: 1.2,
  }

  let g = new InvoluteGear2D(
    gear_params.n_teeth,
    gear_params.module,
    gear_params.pressure_angle_deg,
    gear_params.stretch_ratio
  );

  // view port size
  const vs = g.tip_diameter / 0.8;
  const draw = new Svg()
    .viewbox(-vs / 2, -vs / 2, vs, vs)
    .size('100%', '100%');

  const polygon = draw.polygon()
    .fill('transparent')
    .stroke({ color: 'tomato', width: 0.05 });

  polygon.plot(g.points);

  return (
    <div className="App">
      <div className={classes.root}>
        <main className={classes.content}>
          <div dangerouslySetInnerHTML={{ __html: draw.svg() }}></div>
        </main>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <List>

            <ListItem button>
              <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
            </ListItem>
            <ListItem button>
              <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
            </ListItem>
            <ListItem button>
              <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
            </ListItem>

          </List>
        </Drawer>
      </div>
    </div>
  );
}

export default App;
