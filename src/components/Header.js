import * as React from 'react'
import { signOut ,useSession } from 'next-auth/react'
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

  const { data: session, status } = useSession()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={3}>
        <Container maxWidth='lg'>
          <Toolbar> 
            <Link href={'/'} passHref>           
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Anunx
              </Typography>
            </Link>
            <Link href={ session ? '/user/publish' : '/auth/signin'} passHref>          
              <Button 
                color="inherit" 
                variant='outlined' 
                sx={{
                  marginRight: '10px',
                  [theme.breakpoints.down('sm')]: {
                    visibility: 'hidden',                    
                  } 
                }}
              >
                Anunciar e Vender
              </Button>
            </Link>

            {
              session
                ? (
                  <IconButton color='secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)} >
                    {
                      session.user.image 
                        ? <Avatar src={session.user.image} />
                        : <AccountCircle />
                    }
                    <Typography variant='subtitle2' color='secondary' sx={{ marginLeft: '10px' }}>
                      {session.user.name}
                    </Typography>     
                  </IconButton>
                ) : null
            }

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
              <MenuItem onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
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
