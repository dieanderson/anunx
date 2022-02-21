import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

const CheckAuth = ({ Component, pageProps }) => {

    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        if(!session){
            router.push('/auth/signin')
        }
    }, [session, status])

    if(session){
        return <Component {...pageProps} />
    }
    
    return 'Carregando...'
    
    
}

export default CheckAuth