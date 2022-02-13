import Header from '../components/Header'

const Defalut = ({ children }) => {
    return(
        <>
            <Header />
                {children}
            <footer>
                FOOTER
            </footer>
        </>
    )
}

export default Defalut