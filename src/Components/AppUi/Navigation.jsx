import React from "react";
import { Drawer,  Button } from "rsuite";
import '../AppUi/ui.css'
import MenuIcon from '@rsuite/icons/Menu';

const Navigation = () => {
  const [size, setSize] = React.useState();
  const [open, setOpen] = React.useState(false);
  const placement = "right"; // Set placement to 'left' for the drawer

  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };

  return (
    <>
      <header className="bg-light p-3">
      <div className="d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          Diary
        </a>
        <div className="d-flex">
           <button className="btn " onClick={handleOpen}> <i class="fa fa-bars" aria-hidden="true"></i> </button>
          {/* Add more elements or buttons as needed */}
        </div>
      </div>
    </header>

      <Drawer
        size="30rem"
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => alert("hello ")} appearance="primary">
              
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
      </Drawer>
    </>
  );
};

export default Navigation;
