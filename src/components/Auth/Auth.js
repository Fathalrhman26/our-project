import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Container, Paper, Tabs, Tab, Box } from '@mui/material';

const Auth = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && <SignIn />}
          {activeTab === 1 && <SignUp />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
