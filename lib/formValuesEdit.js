import * as yup from 'yup'

const initialValues = {
    title: '',
    category: '',
    description: '',
    price: '',
    email: '',
    name: '',
    phone: '',
    uf: '',
    city: '',
    files: [],
}

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Escreva um título maior')
        .max(40, 'Título muito grande')
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
    uf: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    files: yup.array().
        min(1, 'Envie pelo menos uma foto')
        .max(10, 'No máximo 10 fotos por anúncio')
        .required('Campo obrigatório'),
})

export {
    initialValues, 
    validationSchema,
}