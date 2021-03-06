import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
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
    CircularProgress,
 } from '@mui/material'

import { initialValues, validationSchema } from '../../../lib/formValuesPublish'
import TemplateDefault from '../../../src/templates/Defaut'
import theme from '../../../src/theme'
import FileUpload from '../../../src/components/FileUpload'
import useToasty from '../../../src/contexts/Toasty'

const Publish = ({ userId, image }) => {

    const { setToasty } = useToasty()
    const router = useRouter()
    
    const [ listUf, setListUf ] = useState([])
    
    const [ listCity, setListCity ] = useState([])

    const formValues = {
        ...initialValues,               
    }     
    formValues.userId = userId
    formValues.image = image
    
    const handleSuccess = () => {
        setToasty({
            open: true,
            text: 'Anúncio cadastrado com sucesso!',
            severity: 'success',
        })
        router.push('panel')
    }

    const handleError = () => {
        setToasty({
            open: true,
            text: 'Ocorreu um erro, tente novamente!',
            severity: 'error',
        })    
    }

    const handleFormSubmit = (values) => {
        const formData = new FormData()
        
        for (let field in values) {
            if(field === 'files'){
                values.files.forEach(file => {
                    formData.append('files', file)
                })
            }else{
                formData.append(field, values[field])
            }
        }

        axios.post('/api/products/add', formData)
            .then(handleSuccess)
            .catch(handleError)
    }

    function loadUf() {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')            
            .then( response => {
                const ufs= response.data.sort((a,b) => a.nome.localeCompare(b.nome))
                setListUf([...ufs])
            })            
    }  

    function loadCity(id) {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)            
            .then( response => {
                const citys = response.data.sort((a,b) => a.nome.localeCompare(b.nome))
                setListCity([...citys])
            })            
    } 
  
    useEffect(()=>{
      loadUf() 
    }, [])   

    
    return(
        <TemplateDefault>

            <Formik
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={ handleFormSubmit }  
                            
                               
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        setFieldValue,
                        isSubmitting,
                    }) => {                 
                        

                        return(
                            <form onSubmit={handleSubmit}>
                                <Input type='hidden' name='userId' value={values.userId}/>
                                <Input type='hidden' name='image' value={values.image}/>

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
                                                    onKeyPress
                                                />                                                
                                                <FormHelperText>
                                                    {errors.phone && touched.phone ? errors.phone : null}
                                                </FormHelperText>
                                            </FormControl>
                                            <br /> <br />
                                            <FormControl error={errors.uf && touched.uf} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    UF *
                                                </InputLabel>                                                
                                                <Select
                                                    name='uf'
                                                    value={values.uf}                                                    
                                                    onChange={handleChange}
                                                    label='UF *'
                                                    onBlur={(e) => { loadCity(e.target.value) } }
                                                >
                                                    {                                                      
                                                       listUf.map((a,b) => (                                                             
                                                            <MenuItem key={a.id} value={a.id}>{a.sigla} - {a.nome}</MenuItem>
                                                       ))                                                  
                                                    }                                                 
                                                </Select>
                                                <FormHelperText>
                                                    {errors.uf && touched.uf ? errors.uf : null}
                                                </FormHelperText>
                                            </FormControl>
                                            <br /> <br />
                                            <FormControl error={errors.city && touched.city} fullWidth>
                                                <InputLabel sx={{fontWeight: 400, color: theme.palette.primary.main}}>
                                                    Cidade *
                                                </InputLabel>                                                
                                                <Select                                                    
                                                    name='city'
                                                    value={values.city}                                                     
                                                    onChange={handleChange}
                                                    label='Cidade *'                                                                                                                                                      
                                                >
                                                    {                                                       
                                                       listCity.map((a,b) => (
                                                            <MenuItem key={a.nome} value={a.nome}>{a.nome}</MenuItem>
                                                       ))                                                  
                                                    }                                                  
                                                </Select>
                                                <FormHelperText>
                                                    {errors.city && touched.city ? errors.city : null}
                                                </FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Container>

                                    <Container maxWidth='md'  sx={{ paddingTop: 3}}>
                                        <Box textAlign='right'>
                                        {
                                            isSubmitting
                                            ? (
                                                <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />
                                            )
                                            : (  
                                                <Button type='submit' variant='contained' color='primary'>
                                                    Publicar Anúncio
                                                </Button>
                                            )
                                        }
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

export async function getServerSideProps({ req }) {
    const { accessToken, user } = await getSession({ req })    
    
    let token = ''
    accessToken
        ? token = accessToken
        : token = user.email

    
    let img = '' 
    user.image
        ? img = user.image
        : img = null

    
    return {        
        props:{
            userId: token,
            image: img,
        }
    }
}

export default Publish