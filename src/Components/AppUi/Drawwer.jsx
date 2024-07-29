import React, { useState } from "react";
import { Drawer, Button, Nav } from "rsuite";
import '../AppUi/ui.css';
import MenuIcon from '@rsuite/icons/Menu';

const Navigation = () => {
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Add state for theme
  const placement = "right"; // Set placement to 'left' for the drawer

  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply the theme class to the body or container
  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <header className={`bg-${theme} p-3`}>
        <div className="d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="#">
            Diary
          </a>
          <div className="d-flex">
            <button className="btn" onClick={handleOpen}>
            <i className={`fa fa-bars ${theme === 'light' ? 'text-dark' : 'text-light'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </header>

      <Drawer
        size="21rem"
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
        className={theme==='light'?"text-dark":'bg-dark'}
      >
        <Drawer.Header  className={theme==='dark'?"text-light bg-dark":'text-light'}>
          <Drawer.Title  className={theme==='dark'?"text-light":'text-dark'}>Diary-logo</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body  className={theme==='dark'?"text-light bg-dark":'text-light'}>
          <Nav vertical >
            <Nav.Item>
              <div className={theme==='dark'?"text-light":'text-dark'} onClick={toggleTheme} >
                <label>Theme: </label>
                <button  className={theme==='dark'?"text-light btn btn-sm":'text-dark btn btn-sm'}  >
                <i class={theme === 'light' ?"fa fa-sun-o":"fa fa-moon-o"} aria-hidden="true"></i>
                </button>
              </div>
            </Nav.Item>
            <Nav.Item href="#home" onClick={() => setOpen(false)} className={theme==='dark'?"text-light":'text-dark'} >Daily Task</Nav.Item>
            <Nav.Item href="#daily-tasks" onClick={() => setOpen(false)} className={theme==='dark'?"text-light":'text-dark'} >Today's Task</Nav.Item>
            <Nav.Item href="#settings" onClick={() => setOpen(false)} className={theme==='dark'?"text-light":'text-dark'} >My Note</Nav.Item>
            <Nav.Item href="#settings" onClick={() => setOpen(false)} className={theme==='dark'?"text-light":'text-dark'} >Account</Nav.Item>
          </Nav>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Navigation;
