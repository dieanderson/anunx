import Header from '../components/Header'
import Footer from '../components/Footer'

const Defalut = ({ children }) => {
    return(
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}

export default Defalut