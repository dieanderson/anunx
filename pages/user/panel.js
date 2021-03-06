import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import slugify from 'slugify'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material'

import TemplateDefault from '../../src/templates/Defaut'
import Card from '../../src/components/Card'
import ProductsModel from '../../src/models/products'
import { getSession } from 'next-auth/react'
import dbConnect from '../../src/utils/dbConnect'
import { formatCurrency } from '../../src/utils/currency'
import useToasty from '../../src/contexts/Toasty'
import Link from 'next/link'

const Panel = ({ products }) => {

  const router = useRouter()
  const [productId, setProductId] = useState()
  const [removedProducts, setRemovedProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const { setToasty } = useToasty()  
  
  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)    
  }

  const handleClickEdit = (productId) => {
    setProductId(productId)
    router.push({
      pathname: `/user/edit/${productId}`,
    })
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: {
        id: productId
      }
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    console.log('success')
    setOpenConfirmModal(false)
    setRemovedProducts([ ...removedProducts, productId ])
    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })
  }

  const handleError = () => {
    console.log('error')
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, Ocorreu um erro!'
    })
  }

  const handleNewPublish = () => {
    router.push('publish')
  }

  return (
    <TemplateDefault>

      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Deseja realmente re mover este anúncio?</DialogTitle>
        <DialogContent>
          <DialogContentText>Esta ação não poderá ser desfeita.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleConfirmRemove} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>
      
      <Container maxWidth='sm'>
        <Typography component='h1' variant='h2' align='center'>
          Meus Anúncios
        </Typography>             
          <Button onClick={handleNewPublish} variant='contained' color='primary' sx={{margin: '30px auto', display: 'block'}}>
            Publicar novo anúncio
          </Button>              
      </Container>

      <Container maxWidth='lg'>
        {
          products.length === 0 &&
            <Typography component='div' variant='body1' align='center' color='textPrimary' gutterBottom>
              Nenhum anúncio publicado
            </Typography>
        }
        <Grid container spacing={4}>

          {
            products.map(product => {
              if (removedProducts.includes(product._id)) return null
              
              const category = slugify(product.category).toLowerCase()
              const title = slugify(product.title).toLowerCase()
              
              return(                
                <Grid key={product._id} item xs={12} sm={6} md={3}>
                  
                      <Card               
                        image={`/uploads/${product.files[0].name}`}
                        title={product.title}
                        subtitle={ formatCurrency( product.price ) }
                        actions={
                          <>
                            <Link href={`/${category}/${title}/${product._id}`}>
                              <a>
                                <Button size='small' color='primary'>Ver</Button> 
                              </a>
                            </Link>
                            <Button onClick={() => handleClickEdit(product._id)} size='small' color='primary'>Editar</Button>
                            <Button onClick={() => handleClickRemove(product._id)} size='small' color='primary'>Remover</Button>
                          </>
                        }  
                      />
                                                          
                </Grid>
              )
            })
          }    

        </Grid>

      </Container>
    </TemplateDefault>
  )
}

Panel.requireAuth = true

export async function getServerSideProps({req}) {
  const session = await getSession({req})
  await dbConnect()

  let token = ''
  session.accessToken
    ? token = session.accessToken
    : token = session.user.email

  const products = await ProductsModel.find({ 'user.id': token })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Panel