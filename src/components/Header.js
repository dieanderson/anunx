import * as React from 'react'
import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider, 
} from '@mui/material'

import Link from 'next/link'
import { AccountCircle } from '@mui/icons-material'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import SellIcon from '@mui/icons-material/Sell';
import LogoutIcon from '@mui/icons-material/Logout';
import theme from '../theme'

export default function ButtonAppBar() {
  const [anchorUserMenu, setAnchorUserMenu] = React.useState(null)

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={3}>
        <Container maxWidth='lg'>
          <Toolbar>            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Anunx
            </Typography>
            <Link href={'/user/publish'} passHref>          
              <Button 
                color="inherit" 
                variant='outlined' 
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    visibility: 'hidden',
                  } 
                }}
              >
                Anunciar e Vender
              </Button>
            </Link>

            <IconButton color='secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
              {
                true === false 
                  ? <Avatar src=''/>
                  : <AccountCircle />
              }
              <Typography variant='subtitle2' color='secondary'  sx={{ ml: 1 }}>
                Diego Anderson
              </Typography>     
            </IconButton>
            <Menu
              open={openUserMenu}
              anchorEl={anchorUserMenu}
              onClose={() => setAnchorUserMenu(null)}
            >
              <Link href={'/user/dashboard'} passHref>  
                <MenuItem>
                  <NewspaperIcon sx={{ mr: 1 }} />
                  Meus anúncios
                </MenuItem>
              </Link>
              <Link href={'/user/publish'} passHref>  
                <MenuItem>
                  <SellIcon sx={{ mr: 1 }} />
                  Publicar novo anúncio
                </MenuItem>
              </Link>
              <Divider />
              <MenuItem>
                <LogoutIcon sx={{ mr: 1 }} />
                Sair
              </MenuItem>
            </Menu>  
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
