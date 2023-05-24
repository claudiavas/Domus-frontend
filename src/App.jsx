import './App.css'
import ResponsiveDrawer from './components/ResponsiveDrawer/ResponsiveDrawer';
import { Container } from '@mui/material';

const App = () => {

return (
    <Container>
      <div className="App">
        <ResponsiveDrawer/>
      </div>
    </Container>
    );
  }  

export default App