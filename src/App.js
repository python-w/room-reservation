import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { Button, Container, CssBaseline } from '@mui/material';
import Search from './features/search/Search';
import CustomTheme from './customTheme';

function App() {
  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        {/* Temp Line Breaks */}
        <br />
        <br />
        <Search />
      </Container>
    </ThemeProvider>
  );
}

export default App;
