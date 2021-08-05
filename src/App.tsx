import React, { useEffect, useState } from 'react';
import { Svg } from '@svgdotjs/svg.js';
import _ from 'lodash';
import { InvoluteGear2D } from './geometry/involute_gear';

// import {, List, ListItem, makeStyles, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';


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


function useValidation<T>(
  defaultValue: T,
  parser: (t: string) => T,
  validator: (v: T) => boolean
): [string, any, T, boolean] {
  const [text, setText] = useState(`${defaultValue}`);
  const [value, setValue] = useState(defaultValue);
  const [valid_value, set_valid_value] = useState(defaultValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    setValue(parser(text))
  }, [text, parser])

  useEffect(() => {
    const is_valid = validator(value);
    setError(!is_valid);
    if (is_valid) {
      set_valid_value(value);
    }
  }, [value, validator]);

  return [text, setText, valid_value, error];
}


function App() {
  const classes = useStyles();

  const [validated, setValidated] = useState(true);
  const [n_teeth_text, set_n_teeth_text, n_teeth, n_teeth_error] =
    useValidation(18, parseInt, (v) => (v >= 5));
  const [module_text, set_module_text, module, module_error] =
    useValidation(1, parseFloat, (v) => (v >= 0));
  const [pressure_angle_deg_text, set_pressure_angle_deg_text, pressure_angle_deg, pressure_angle_deg_error] =
    useValidation(20, parseFloat, (v) => (v >= 17 && v <= 22));
  const [stretch_ratio_text, set_stretch_ratio_text, stretch_ratio, stretch_ratio_error] =
    useValidation(1, parseFloat, (v) => (v >= 1));
  useEffect(() => {
    setValidated(!n_teeth_error && !module_error && !pressure_angle_deg_error && !stretch_ratio_error);
  }, [n_teeth_error, module_error, pressure_angle_deg_error, stretch_ratio_error])


  const [svg, set_svg] = useState(new Svg().size('100%', '100%'));
  useEffect(() => {
    let g = new InvoluteGear2D(
      n_teeth,
      module,
      pressure_angle_deg,
      stretch_ratio
    );

    // view port size
    const size = g.tip_diameter / 0.8;
    const draw = new Svg()
      .viewbox(-size / 2, -size / 2, size, size)
      .size('100%', '100%');

    const polygon = draw.polygon()
      .fill('transparent')
      .stroke({ color: 'tomato', width: 0.05 });
    polygon.plot(g.points);

    set_svg(draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n_teeth, module, pressure_angle_deg, stretch_ratio]);

  return (
    <div className="App">
      <div className={classes.root}>
        <main className={classes.content}>
          <div dangerouslySetInnerHTML={{ __html: svg.svg() }}></div>
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
            <ListItem>
              <TextField
                error={n_teeth_error}
                id="standard-required" label="Number of Teeth"
                value={n_teeth_text}
                onChange={(e) => set_n_teeth_text(e.target.value)} />
            </ListItem>
            <ListItem>
              <TextField
                error={module_error}
                id="standard-required" label="Module"
                value={module_text}
                onChange={(e) => set_module_text(e.target.value)} />
            </ListItem>
            <ListItem>
              <TextField
                error={pressure_angle_deg_error}
                id="standard-required" label="Pressure Angle (deg)"
                value={pressure_angle_deg_text}
                onChange={(e) => set_pressure_angle_deg_text(e.target.value)} />
            </ListItem>
            <ListItem>
              <TextField
                error={stretch_ratio_error}
                id="standard-required" label="Stretch Ratio"
                value={stretch_ratio_text}
                onChange={(e) => set_stretch_ratio_text(e.target.value)} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
}

export default App;
