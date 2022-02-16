import { 
    Box, 
    Button, 
    Container, 
    FormControl, 
    FormHelperText, 
    IconButton, 
    Input, 
    InputAdornment, 
    InputLabel, 
    MenuItem,    
    Select,   
    Typography,
 } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'

import { useDropzone } from 'react-dropzone'
import { Formik } from 'formik'
import * as yup from 'yup'

import TemplateDefault from '../../src/templates/Defaut'
import theme from '../../src/theme'
import styles from '../../styles/publish.module.css'


const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Escreva um título maior')
        .max(100, 'Título muito grande')
        .required('Campo obrigatório'),
    category: yup.string().required('Campo obrigatório'),
    description: yup.string()
        .min(50, 'Escreva uma descrição maior')
        .max(500, 'Descrição muito grande')
        .required('Campo obrigatório'),
    price: yup.number().required('Campo obrigatório'),
    email: yup.string()
        .email('Escreva um e-mail válido')
        .required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    phone: yup.number().required('Campo obrigatório'),
    files: yup.array().
        min(1, 'Envie pelo menos uma foto')
        .max(10, 'No máximo 10 fotos por anúncio')
        .required('Campo obrigatório'),
})

const Publish = () => {
    
    return(
        <TemplateDefault>

            <Formik
                initialValues={{
                    title: '',
                    category: '',
                    description: '',
                    price: '',
                    email: '',
                    name: '',
                    phone: '',
                    files: [],
                }}
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

                        const { getRootProps, getInputProps } = useDropzone({
                            accept: 'image/*',
                            onDrop: (acceptedFile) => {
                                const newFiles = acceptedFile.map(file => {
                                    return Object.assign(file, {
                                        preview: URL.createObjectURL(file)
                                    })
                                })
                                setFieldValue('files', [
                                    ...values.files,
                                    ...newFiles,
                                ])
                            }
                        })
                    
                        const handleRemoveFile = fileName => {
                            const newFilesState = values.files.filter( file => file.name !== fileName)
                            setFieldValue('files', newFilesState)
                        }

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
                                                    Título do Anúncio
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
                                                    Categoria
                                                </InputLabel>
                                                <Select
                                                    name='category'
                                                    value={values.category}                                                    
                                                    onChange={handleChange}
                                                    label='Categoria'
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
                                            <Typography component='h6' variant='h6' color={ errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                Imagens
                                            </Typography>
                                            <Typography component='div' variant='body2' color={ errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                A primeira imagem é a foto principal do seu anúncio.
                                            </Typography>
                                            {
                                                errors.files && touched.files
                                                ? <Typography variant='body2' color='error' gutterBottom>{errors.files}</Typography>
                                                : null  
                                            }
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: 3 }}>
                                                
                                                <Box 
                                                    className={styles.boxDrop} 
                                                    sx={{ backgroundColor: theme.palette.background.default }}
                                                    {...getRootProps()}
                                                >
                                                    <input name='files' {...getInputProps()} />
                                                    <Typography variant='body2' color={ errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                        Clique para adicionar ou arraste a imagem para aqui.
                                                    </Typography>
                                                </Box>

                                                {
                                                    values.files.map( (file, index) => (

                                                        <Box 
                                                            key={file.name} 
                                                            className={styles.thumb} 
                                                            sx={{
                                                                position: 'relative',
                                                                backgroundImage: `url(${file.preview})`
                                                            }}
                                                        >
                                                            {
                                                                index === 0 ?
                                                                    <Box sx={{
                                                                        position: 'absolute', 
                                                                        backgroundColor: 'blue', 
                                                                        padding: '4px 10px', 
                                                                        bottom: 0, 
                                                                        left: 0,
                                                                        borderRadius: '0 10px 0 0',
                                                                    }}
                                                                    >
                                                                        <Typography variant='body2' color='secondary'>
                                                                            Principal
                                                                        </Typography>
                                                                    </Box>
                                                                : null
                                                            }
                                                            
                                                            <Box className={styles.mask}>
                                                                <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)}>
                                                                    <DeleteForever fontSize='large'/>
                                                                </IconButton>
                                                            </Box>    
                                                        </Box>

                                                    ))
                                                }                            

                                            </Box>
                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'>
                                        <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                                            
                                            <FormControl error={errors.description && touched.description} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    Escreva a descrição em detalhes do que está vendendo
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
                                                    Preço de Venda
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
                                                    Nome
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
                                                    E-mail
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
                                                    Telefone
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

export default Publish