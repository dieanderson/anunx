import { Box, Button, Container, Select, TextField, Typography } from '@mui/material'

import TemplateDefault from '../../src/templates/Defaut'
import theme from '../../src/theme'

const Publish = () => {
    return(
        <TemplateDefault>
            <Container maxWidth='md' sx={{ paddingTop: 8}}>

                <Typography component='h1' variant='h2' align='center' color='textPrimary'>
                    Publicar Anúncio
                </Typography>
                <Typography component='h5' variant='h5' align='center' color='textPrimary'>
                    Quanto mais detalhado, melhor!
                </Typography>

                <Container maxWidth='md'>
                    <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 5, padding: 3 }}>
                        <Typography component='h6' variant='h6' color='textPrimary'>
                            Título do Anúncio
                        </Typography>
                        <TextField 
                            label='ex: Bicicleta aro 18 com garantia'
                            size='small'
                            fullWidth
                        />

                        <br /><br />
                        <Typography component='h6' variant='h6' color='textPrimary'>
                            Categoria
                        </Typography>
                        <Select
                            native
                            value=''
                            fullWidth
                            onChange={() => {}}
                            inputProps={{
                                name: 'age',
                            }}
                        >
                            <option value=''>Selecione</option>
                            <option value={1}>Bebê e Criança</option>
                            <option value={2}>Agricultura</option>
                            <option value={3}>Moda</option>
                            <option value={4}>Carros, Motos e Barcos</option>
                            <option value={5}>Serviços</option>
                            <option value={6}>Lazer</option>
                            <option value={7}>Animais</option>
                            <option value={8}>Moveis, Casa e Jardim</option>
                            <option value={9}>Imóveis</option>
                            <option value={10}>Equipamentos e Ferramentas</option>
                            <option value={11}>Celulares e Tablets</option>
                            <option value={12}>Esporte</option>
                            <option value={13}>Tecnologia</option>
                            <option value={14}>Emprego</option>
                            <option value={15}>Outros</option>
                        </Select>
                    </Box>
                </Container>

                <Container maxWidth='md'>
                    <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                        <Typography component='h6' variant='h6' color='textPrimary'>
                            Imagens
                        </Typography>
                        <Typography component='div' variant='body2' color='textPrimary'>
                            A primeira imagem é a foto principal do seu anúncio.
                        </Typography>
                    </Box>
                </Container>

                <Container maxWidth='md'>
                    <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                        <Typography component='h6' variant='h6' color='textPrimary'>
                            Descrição
                        </Typography>
                        <Typography component='div' variant='body2' color='textPrimary'>
                            Escreva os detalhes do que está vendendo
                        </Typography>
                        <TextField
                            multiline
                            rows={6}
                            variant='outlined'
                            fullWidth
                        />
                    </Box>
                </Container>

                <Container maxWidth='md'>
                    <Box sx={{ backgroundColor: theme.palette.background.white, marginTop: 3, padding: 3 }}>
                        <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                            Dados de Contato
                        </Typography>
                        <TextField
                            label='Nome'
                            size='small'
                            variant='outlined'
                            fullWidth
                        />
                        <br /> <br />
                        <TextField
                            label='E-mail'
                            size='small'
                            variant='outlined'
                            fullWidth
                        />
                        <br /> <br />
                        <TextField
                            label='Telefone'
                            size='small'
                            variant='outlined'
                            fullWidth
                        />
                    </Box>
                </Container>

                <Container maxWidth='md'  sx={{ paddingTop: 3}}>
                    <Box textAlign='right'>
                        <Button variant='contained' color='primary'>
                            Publicar Anúncio
                        </Button>
                    </Box>
                </Container>

            </Container>
        </TemplateDefault>
    )
}

export default Publish