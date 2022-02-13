import TemplateDefault from '../../src/templates/Defaut'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'

export default function Home() {
  return (
    <TemplateDefault>
      
      <Container maxWidth='sm' sx={{ padding: (8,0,6) }}>
        <Typography component='h1' variant='h2' align='center'>
          Meus Anúncios
        </Typography>        
        <Button variant='contained' color='primary' sx={{margin: '30px auto', display: 'block'}}>
          Publicar novo anúncio
        </Button>        
      </Container>

      <Container maxWidth='md'>
        <Grid container spacing={4}>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia sx={{ paddingTop: '56%' }} 
                image={'https://source.unsplash.com/random'}
                title='titulo da imagem'  
              />
              <CardContent>
                <Typography component='h2' variant='h5'>
                  Produto XXXXXXXX
                </Typography>
                <Typography>
                  R$ 100,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Remover</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia sx={{ paddingTop: '56%' }} 
                image={'https://source.unsplash.com/random'}
                title='titulo da imagem'  
              />
              <CardContent>
                <Typography component='h2' variant='h5'>
                  Produto XXXXXXXX
                </Typography>
                <Typography>
                  R$ 100,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Remover</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia sx={{ paddingTop: '56%' }} 
                image={'https://source.unsplash.com/random'}
                title='titulo da imagem'  
              />
              <CardContent>
                <Typography component='h2' variant='h5'>
                  Produto XXXXXXXX
                </Typography>
                <Typography>
                  R$ 100,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>Editar</Button>
                <Button size='small' color='primary'>Remover</Button>
              </CardActions>
            </Card>
          </Grid>

        </Grid>

      </Container>
    </TemplateDefault>
  )
}
