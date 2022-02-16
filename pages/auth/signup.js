import { 
    Box,
    Button,
    Container, 
    FormControl, 
    FormHelperText, 
    Input, 
    InputLabel, 
    Link, 
    Typography 
} from '@mui/material'

import { Formik } from 'formik'

import TemplateDefault from '../../src/templates/Defaut'
import theme from '../../src/theme'
import { initialValues, validationSchema } from './formValues'


const Singup = () => {
    return (

        <TemplateDefault>
            
            <Container maxWidth='sm' component='main'>

                <Typography component='h1' variant='h2' align='center' color='textPrimary'>
                    Crie sua conta
                </Typography>
                <Typography component='h5' variant='h5' align='center' color='textPrimary'>
                    E anuncie para todo Brasil!
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
                                        <FormControl error={errors.name && touched.name} fullWidth sx={{mb: theme.spacing(1)}}>
                                            <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                Nome *
                                            </InputLabel>
                                            <Input
                                                name='name'
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                {errors.name && touched.name ? errors.name : null}
                                            </FormHelperText>
                                        </FormControl>
                                        
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
                                        
                                        <FormControl error={errors.passwordConf && touched.passwordConf} fullWidth sx={{mb: theme.spacing(1)}}>
                                            <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                Confirmação de senha *
                                            </InputLabel>
                                            <Input
                                                name='passwordConf'
                                                value={values.passwordConf}
                                                onChange={handleChange}
                                                type='password'
                                            />
                                            <FormHelperText>
                                                {errors.passwordConf && touched.passwordConf ? errors.passwordConf : null}
                                            </FormHelperText>
                                        </FormControl>
                                        
                                        <Button
                                            type='submit'
                                            fullWidth
                                            variant='contained'
                                            color='primary'
                                            sx={{m: theme.spacing(3, 0, 2)}}                                            
                                        >
                                            Cadastrar
                                        </Button>
                                        <Link href={'/auth/signin'} passHref variant="body2">
                                            {"Já tem uma conta? Acesse aqui"}
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

export default Singup