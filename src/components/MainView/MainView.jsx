import React from 'react';

import PropTypes from 'prop-types';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { AccountMenu } from './AccountMenu/AccountMenu';
import Filters from './Filters/Filters';
import HousingList from './HousingList/HousingList';
import { useState } from 'react';



export function MainView(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      > 
        <Toolbar>
         <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <ManageSearchIcon style={{ fontSize: '30px' }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
          {/* <AccountMenu/> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
          keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Filters/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Filters/>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, margin: 0 } }}
      >
        <Toolbar />
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
              <Tab label="Inmuebles" {...a11yProps(0)} />
              <Tab label="Requerimientos" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            
            <HousingList/>          
                         
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            Requerimientos
          </TabPanel>
      </Box>
    </Box>
  );
}

MainView.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
