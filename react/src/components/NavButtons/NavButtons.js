import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Paths } from '../../paths';
// import './NavButtons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavButtons=()=>{

    const isLogged=useSelector(state=>state.isLogged);
    
    return (
        <div> 
        {
            isLogged?
            <Link to={Paths.profile} className='m-0'>
                <Button variant='success'>داشبورد</Button>
            </Link>
            :
            <Link to={Paths.login} className='m-0'>
                <Button variant='success'>ورود</Button>
            </Link>
        }
        </div>    
    );
};

export default NavButtons;