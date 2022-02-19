import { signIn } from "next-auth/react"
import Image from "next/image"
import { 
    Box,
    Button,
    Container, 
    FormControl, 
    FormHelperText, 
    Input, 
    InputLabel, 
    Link, 
    Typography,
    Alert, 
} from '@mui/material'

import { Formik } from 'formik'
import { useRouter } from 'next/router'

import TemplateDefault from '../../src/templates/Defaut'
import theme from '../../src/theme'
import { initialValues, validationSchema } from './formValuesSignin'


const Signin = () => {
    
    const router = useRouter()    

    const handleGoogleLogin = () => {
        signIn('google', {
            callbackUrl: 'http://localhost:3000/user/dashboard'
        })
    }    
    
    const handleFormSubmit = async (values) => {        
        
        signIn('credentials', {            
                email: values.email,
                password: values.password,
                callbackUrl: 'http://localhost:3000/user/dashboard',
            }
        )
    
    }

    return (

        <TemplateDefault>            
            
            <Container maxWidth='sm' component='main'>

                <Typography component='h1' variant='h2' align='center' color='textPrimary'>
                Acesse a sua conta
                </Typography>                                          

            </Container>

            <Container maxWidth='sm'>
                <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 5, padding: 3, borderRadius: 2 }}>
                    <Box display='flex' justifyContent='center'>
                        <Button 
                            variant="contained"
                            color="primary"
                            startIcon={
                                <Image 
                                    src='/images/logo_google.svg' 
                                    width={20} 
                                    height={20}
                                    alt='Login com Google' 
                                />
                            }
                            onClick={ handleGoogleLogin } 
                        >
                            Entrar com Google
                        </Button>
                    </Box>
                    <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#e8e8e8',
                            width: '100%',
                            height: '1px',
                            margin: theme.spacing(7,0,4),
                            '& span': {
                                backgroundColor: 'white',
                                padding: '0 30px'
                            }
                        }}
                    >
                        <span>ou</span>
                    </Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
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

                                        {
                                            router.query.i === '1'
                                            ? (
                                                <Alert severity="error" sx={{ margin: '20px 0' }}>
                                                    Usuário ou senha inválidos
                                                </Alert>
                                            )
                                            : null 
                                        }                                       
                                        
                                        <FormControl error={errors.email && touched.email} fullWidth sx={{mb: theme.spacing(1)}}>
                                            <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                E-mail *
                                            </InputLabel>
                                            <Input
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                                type='email'
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