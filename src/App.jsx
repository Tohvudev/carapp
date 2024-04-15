import React, { useState } from 'react';
import './App.css';
import Carlist from './components/Carlist';
import { AppBar, Typography, Toolbar, Button } from '@mui/material';
import AddCarDialog from './components/AddCarDialog';

function App() {
  const [openAddCarDialog, setOpenAddCarDialog] = useState(false);

  const handleOpenAddCarDialog = () => {
    setOpenAddCarDialog(true);
  };

  const handleCloseAddCarDialog = () => {
    setOpenAddCarDialog(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Car Shop
          </Typography>
          <Button color="inherit" onClick={handleOpenAddCarDialog}>Add car</Button>
        </Toolbar>
      </AppBar>
      <Carlist />
      <AddCarDialog open={openAddCarDialog} handleClose={handleCloseAddCarDialog} />
    </>
  );
}

export default App;
