import { AppBar, Box, Button, IconButton, InputBase, Toolbar, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const Navbar = ({ debouncedQuery }: { debouncedQuery: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  // const [searchResults, setSearchResults] = useState([]);
  return (
    
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: "1" }}>
          Movie App
        </Typography>
        <Box sx={{display:"flex", alignItems: "center"}}>
            <InputBase
            placeholder="Buscar..."
            sx={{ml: 1, flex: 1, bgcolor: "white", borderRadius: 1, px: 2}}
            onChange={debouncedQuery}
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </Box>
        <Button color="inherit">Inicio</Button>
        <Button color="inherit">Películas</Button>
        <Button color="inherit">Series</Button>
        <Button color="inherit">Categorías</Button>
        <IconButton aria-label="login">
            <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
