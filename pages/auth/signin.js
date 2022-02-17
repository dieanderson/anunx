import { Formik } from 'formik'

import { 
  Box,
  Button,
  Container, 
  FormControl, 
  FormHelperText, 
  Input, 
  InputAdornment, 
  InputLabel, 
  Link, 
  Typography 
} from '@mui/material'

import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

import TemplateDefault from '../../src/templates/Defaut'
import theme from '../../src/theme'
import { initialValues, validationSchema } from './formValues'


const Signin = () => {
  return (

      <TemplateDefault>
          
          <Container maxWidth='sm' component='main'>

              <Typography component='h1' variant='h2' align='center' color='textPrimary'>
                  Acesse a sua conta
              </Typography>                          

          </Container>

          <Container maxWidth='sm'>
              <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 5, padding: 3, borderRadius: 2 }}>
                  <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                          console.log('form enviado!', values)
                      }}
                  >
                      {
                          ({
                              touched,
                              values,
                              errors,
                              handleChange,
                              handleSubmit,
                          }) => {
                              return(
                                  <form onSubmit={handleSubmit}>
                                                                            
                                      <FormControl error={errors.email && touched.email} fullWidth sx={{mb: theme.spacing(1)}}>
                                          <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                              E-mail *
                                          </InputLabel>
                                          <Input
                                              name='email'
                                              value={values.email}
                                              onChange={handleChange}
                                              type='email'
                                              startAdornment={
                                                <InputAdornment position='start'>
                                                  <MailOutlinedIcon />
                                                </InputAdornment>
                                              }
                                          />
                                          <FormHelperText>
                                              {errors.email && touched.email ? errors.email : null}
                                          </FormHelperText>
                                      </FormControl>
                                      
                                      <FormControl error={errors.password && touched.password} fullWidth sx={{mb: theme.spacing(1)}}>
                                          <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                              Senha *
                                          </InputLabel>
                                          <Input
                                              name='password'
                                              value={values.password}
                                              onChange={handleChange}
                                              type='password'
                                              startAdornment={
                                                <InputAdornment position='start'>
                                                  <VpnKeyOutlinedIcon />
                                                </InputAdornment>
                                              }
                                          />
                                          <FormHelperText>
                                              {errors.password && touched.password ? errors.password : null}
                                          </FormHelperText>
                                      </FormControl> 

                                      <Button
                                          type='submit'
                                          fullWidth
                                          variant='contained'
                                          color='primary'
                                          sx={{m: theme.spacing(3, 0, 2)}}                                            
                                      >
                                          Entrar
                                      </Button>

                                      <Link href={'/auth/signup'} variant="body2">
                                        {"Ainda não tem uma conta? Crie uma aqui"}
                                      </Link>
                                  </form>                                    
                              )
                          }
                      }
                  </Formik>
              </Box>
          </Container>

      </TemplateDefault>

  )
}

export default Signin