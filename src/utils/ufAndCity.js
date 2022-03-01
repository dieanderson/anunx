import axios from "axios"

const loadUf = () => {
    return axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')            
                   
}

const getUfFromCodUf = async(codUf) => {     
    const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${codUf}`)
    
    return resp.data.sigla     
}

export {
    getUfFromCodUf,
    loadUf,
}