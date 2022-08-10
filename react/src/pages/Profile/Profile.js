import {Row,Col,Container,Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../../SharedState';
import { Paths } from '../../paths';
import service from '../../services'
import './Profile.css'

const FormValidator = yup.object().shape({
    fullName: yup.string()
        .required(' نام و نام خانوادگی را وارد کنید')
    ,
    userName: yup.string()
        .required('نام کاربری الزامی است')
  })

const Profile=p=>{
    const [loading, changeLoading] = useState(false);
    const [editFailed,setEditFailed]=useState(false);
    const [userInfo,setUserInfo]=useState({fullName:'',userName:''});
    const navigate = useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        doLoad();
    },[]);

    const doSave=values=>{
        changeLoading(true);
        setEditFailed(false);

        const userInfo={userName:values.userName,fullName:values.fullName};

        service.saveUserInfo(userInfo).then(()=>{
            changeLoading(false);
            setUserInfo(userInfo);
            p.updateDone();
        }).catch(e=>{
            console.log('error :>> ', e);
            setEditFailed(true);
            changeLoading(false);
        });
    };

    const doLoad=()=>{
        service.getUserInfo().then(userInfo=>{
            //console.log('user info :>> ', userInfo);
            if(userInfo){
                setUserInfo(userInfo);
            }
        }).catch(e=>{
            console.log('error :>> ', e);
        });
    }

    const doExit=()=>{
        console.log('log out');
        service.logOut();
        dispatch(signOut());
        p.updateDone();
        navigate(Paths.login);
    };

    const PersonalInfoForm=()=>{
        return (
                <Form className='inner-form'>
                    <div className="form-group">
                        <Field type="text" name="fullName" className="form-control" placeholder="نام و نام خانوادگی"/>
                        <ErrorMessage name="fullName" component="div" className='error'/>
                    </div>
                    <div className="form-group">
                        <Field type="text" name="userName" className="form-control" placeholder="نام کاربری"/>
                        <ErrorMessage name="userName" component="div" className='error'/>
                    </div>
                    <Button variant='success' type="submit">
                        {loading ?
                            <Loader
                                type="Puff"
                                color="#bb7"
                                height={20}
                                width={20}
                                timeout={3000} //3 secs
                            />
                            :
                            'ثبت'
                        }
                    </Button>
                    {editFailed && <div className="error editFailed">اطلاعات پذیرفته نشد</div>}
                    
                </Form>
        );
    }
    
    return (
    <div className='profile-page'>
        <div className='profile-form-container'>
            <Container>
                <Row className='outer-row'>
                    <Col className='border right-col' xs={3}>
                        <Row className='right-top-inner-row'>
                            <img className="profile-img" src={require('../../assets/images/profile.jpg').default} alt='main logo'/>

                            <div className='right-fullName'>
                                {userInfo.fullName}
                            </div>
                        </Row>
                        <Row className='right-bottm-inner-row'>
                            <Button className='exit-button' onClick={doExit} variant='dark'>خروج</Button>
                        </Row>
                    </Col>
                    <Col xs={9}>
                        <Row className='border left-top-inner-row'>اطلاعات شخصی</Row>
                        <Row className='border left-bottom-inner-row'>
                            <Formik 
                                enableReinitialize={true} 
                                initialValues={{ ...userInfo }}
                                validationSchema={FormValidator}
                                onSubmit={doSave}
                            >
                                <PersonalInfoForm/>
                            </Formik>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    </div>
    );
};

export default Profile;