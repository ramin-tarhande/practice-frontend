import {BrowserRouter, Route,Routes,Link} from 'react-router-dom';
import {Courses,Login,Profile,About,ContactUs} from './pages'
import {NavButtons} from './components'
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from './SharedState';
import { Paths } from './paths';
import service from './services';
import {Row,Col,Container,fluid} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch=useDispatch();
  const [welcomeText,setWelcomeText]=useState('')

  useEffect(()=>{
    console.log('App started');
    showWelcomeText();
  },[]);

  useEffect(()=>{
      if(service.isAuthenticationDone()){
        dispatch(signIn());
        console.log('sign-in done');
      }else{
        console.log('sign-in not done');
      }
  },[dispatch]);

  const showWelcomeText=()=>{
      service.getUserInfo().then(userInfo=>{
        if(userInfo){
          const pt='عزیز  خوش آمدید';
          setWelcomeText(`${userInfo.fullName} ${pt}`);
        }
        else{
          setWelcomeText('');
        }
      }).catch(e=>{
          console.log('error :>> ', e);
      });
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <Container fluid>
          <Row className='header-container'>
            <Col className='header-col1' xs={12} sm={8}>
              <img src={require('./assets/images/logomain.png').default} alt='main logo'/>  
              <Link to={Paths.home}>دوره ها</Link>
              <Link to={Paths.about}>درباره ما</Link>
              <Link to={Paths.contactus}>تماس با ما</Link>
            </Col>
            <Col className='header-col2 me-sm-auto' xs={12} sm={4}>
                <div className='welcome-container'>
                  <span className='welcome'>{welcomeText}</span>
                </div>
                <div className='me-auto'>
                  <NavButtons/>
                </div>
            </Col>
          </Row>

          <Routes>
            <Route path={Paths.home} element={<Courses/>}/>
            <Route path={Paths.login} element={<Login/>}/>
            <Route path={Paths.profile} element={<Profile updateDone={()=>showWelcomeText()}/>}/>
            <Route path={Paths.about} element={<About/>}/>
            <Route path={Paths.contactus} element={<ContactUs/>}/>
          </Routes>

        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
