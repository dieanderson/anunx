import * as React from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Theme from '../../src/theme'
import TemplateDefault from '../../src/templates/Defaut'

const theme = Theme

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  return (
    <TemplateDefault>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 60, height: 60 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Entre em sua conta
            </Typography>
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              noValidate 
              sx={{ 
                mt: 1, 
                backgroundColor: 'secondary.main',
                p:5,
                width: '500px',
                borderRadius: '10px',
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link href={'/auth/signup'} passHref variant="body2">
                    {"Ainda não tem uma conta? Crie uma aqui"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>          
        </Container>
      </ThemeProvider>
    </TemplateDefault>
  )
}