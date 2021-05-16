import Nav from '../components/header/Nav'
import Body from '../components/body/Body'


const Main = () => {


    return (
        <div style={{ background: "#f8f5f1" }}>
            <Nav />
            <div className="container">
                <Body />
            </div>


        </div >
    )
}

export default Main;