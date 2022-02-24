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
  Grid, 
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
              <a><Typography variant="h6" component="div" sx={{ flexGrow: 1, paddingRight: '30px'}}>
              Anunx
              </Typography></a>
            </Link>

            <Grid container alignItems='flex-end' direction='row' justifyContent="flex-end">
            <Grid item>
            <Link href={ session ? '/user/publish' : '/auth/signin'} passHref>          
              <Button 
                color="inherit" 
                variant='outlined' 
                sx={{
                  padding: '5px',
                  marginBottom: '7px',
                  marginRight: '10px',
                  /*[theme.breakpoints.down('sm')]: {
                                       
                  } */
                }}
              >
                Anunciar e Vender
              </Button>
            </Link>
            </Grid>
            <Grid item >
            {
              session
                ? (
                  <IconButton color='secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)} >
                    {
                      session.user.image 
                        ? <Avatar src={session.user.image} />
                        : <AccountCircle />
                    }
                    <Typography variant='subtitle2' color='secondary' sx={{ marginLeft: '5px' }}>
                      {session.user.name}
                    </Typography>     
                  </IconButton>
                ) : null
            }
            </Grid>

            </Grid>

            <Menu
              open={openUserMenu}
              anchorEl={anchorUserMenu}
              onClose={() => setAnchorUserMenu(null)}
            >
              <Link href={'/user/panel'} passHref>  
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
