import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormHelperText,
    Input, 
    InputAdornment, 
    InputLabel, 
    MenuItem,    
    Select,   
    Typography,
 } from '@mui/material'

import { Formik } from 'formik'

import { initialValues, validationSchema } from './formValues'
import TemplateDefault from '../../../src/templates/Defaut'
import theme from '../../../src/theme'
import FileUpload from '../../../src/components/FileUpload'


const Publish = () => {
    
    return(
        <TemplateDefault>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('ok enviou o form', values)
                }}                
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => {                        

                        return(
                            <form onSubmit={handleSubmit}>
                                <Container maxWidth='md'>

                                    <Typography component='h1' variant='h2' align='center' color='textPrimary'>
                                        Publicar Anúncio
                                    </Typography>
                                    <Typography component='h5' variant='h5' align='center' color='textPrimary'>
                                        Quanto mais detalhado, melhor!
                                    </Typography>

                                    <Container maxWidth='md'>
                                        <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 5, padding: 3 }}>                                         
                                            
                                            <FormControl error={errors.title && touched.title} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    Título do Anúncio *
                                                </InputLabel>                                                
                                                <Input
                                                    name='title'
                                                    value={values.title}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.title && touched.title ? errors.title : null}
                                                </FormHelperText>
                                            </FormControl>

                                            <br /><br />
                                            
                                            <FormControl error={errors.category && touched.category} fullWidth>
                                                
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    Categoria *
                                                </InputLabel>
                                                <Select
                                                    name='category'
                                                    value={values.category}                                                    
                                                    onChange={handleChange}
                                                    label='Categoria *'
                                                >                                                
                                                    <MenuItem value='Bebê e Criança'>Bebê e Criança</MenuItem>
                                                    <MenuItem value='Agricultura'>Agricultura</MenuItem>
                                                    <MenuItem value='Moda'>Moda</MenuItem>
                                                    <MenuItem value='Carros, Motos e Barcos'>Carros, Motos e Barcos</MenuItem>
                                                    <MenuItem value='Serviços'>Serviços</MenuItem>
                                                    <MenuItem value='Lazer'>Lazer</MenuItem>
                                                    <MenuItem value='Animais'>Animais</MenuItem>
                                                    <MenuItem value='Moveis, Casa e Jardim'>Moveis, Casa e Jardim</MenuItem>
                                                    <MenuItem value='Imóveis'>Imóveis</MenuItem>
                                                    <MenuItem value='Equipamentos e Ferramentas'>Equipamentos e Ferramentas</MenuItem>
                                                    <MenuItem value='Celulares e Tablets'>Celulares e Tablets</MenuItem>
                                                    <MenuItem value='Esporte'>Esporte</MenuItem>
                                                    <MenuItem value='Tecnologia'>Tecnologia</MenuItem>
                                                    <MenuItem value='Emprego'>Emprego</MenuItem>
                                                    <MenuItem value='Outros'>Outros</MenuItem>
                                                </Select>
                                               
                                                <FormHelperText>
                                                    {errors.category && touched.category ? errors.category : null}
                                                </FormHelperText>

                                            </FormControl>
                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'>
                                        <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>

                                            <FileUpload 
                                                files={values.files}
                                                errors={errors.files}
                                                touched={touched.files}
                                                setFieldValue={setFieldValue}
                                            />

                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'>
                                        <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                                            
                                            <FormControl error={errors.description && touched.description} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    Escreva a descrição em detalhes do que está vendendo *
                                                </InputLabel>
                                                <Input
                                                    name='description'
                                                    value={values.description}
                                                    multiline
                                                    rows={6}
                                                    onChange={handleChange}
                                                    variant='outlined'                                               
                                                />
                                                <FormHelperText>
                                                    {errors.description && touched.description ? errors.description : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'>
                                        <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                                            
                                            <FormControl error={errors.price && touched.price} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main, fontSize: 22}}>
                                                    Preço de Venda *
                                                </InputLabel>
                                                <Input
                                                    name='price'
                                                    value={values.price} 
                                                    onChange={handleChange}
                                                    startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
                                                    variant='outlined'                                                    
                                                />
                                                 <FormHelperText>
                                                    {errors.price && touched.price ? errors.price : null}
                                                </FormHelperText>
                                            </FormControl>

                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'>
                                        <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                                            <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                                                Dados de Contato
                                            </Typography>
                                            <FormControl error={errors.name && touched.name} fullWidth>
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
                                            <br /> <br />
                                            <FormControl error={errors.email && touched.email} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    E-mail *
                                                </InputLabel>                                                
                                                <Input
                                                    name='email'
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.email && touched.email ? errors.email : null}
                                                </FormHelperText>
                                            </FormControl>
                                            <br /> <br />
                                            <FormControl error={errors.phone && touched.phone} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    Telefone *
                                                </InputLabel>                                                
                                                <Input
                                                    name='phone'
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                />
                                                <FormHelperText>
                                                    {errors.phone && touched.phone ? errors.phone : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'  sx={{ paddingTop: 3}}>
                                        <Box textAlign='right'>
                                            <Button type='submit' variant='contained' color='primary'>
                                                Publicar Anúncio
                                            </Button>
                                        </Box>
                                    </Container>

                                </Container>
                            </form>

                        )
                    }
                }
            </Formik>
            
        </TemplateDefault>
    )
}

Publish.requireAuth = true

export default Publish