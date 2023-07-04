import { Link } from "react-router-dom";
import {Container} from "semantic-ui-react";


function HomePage(){
    return (
        <Container style={{marginTop : '7em'}} >
            <h1>صفحه اصلی</h1>
            <h3>برو به <Link to='/activities'> لیست فعالیت ها</Link></h3>
        </Container>
    )
}

export default HomePage;