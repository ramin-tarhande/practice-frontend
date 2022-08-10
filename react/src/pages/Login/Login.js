import {useState} from 'react';
import {Button} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../../SharedState';
import './Login.css'
import service from '../../services'
import { Paths } from '../../paths';

const FormValidator = yup.object().shape({
    userName: yup.string()
        .required('نام کاربری الزامی است')
    ,
    password: yup.string()
        .min(3, 'حداقل رمز عبور 3 کاراکتر است')
        .required('رمز عبور الزامی است')
  })
  
const Login=()=>{

    const [loginFailed,setLoginFailed]=useState(false);
    const [loading, changeLoading] = useState(false);
    const dispatch=useDispatch();

    const navigate = useNavigate();

    const doLogin=values=>{
        changeLoading(true);
        setLoginFailed(false);
        
        service.login(values).then(()=>{
            changeLoading(false);
            dispatch(signIn());
            navigate(Paths.profile);
        }).catch(e=>{
            console.log('error :>> ', e);
            setLoginFailed(true);
            changeLoading(false);
        });
    };

    const LoginForm=()=>{
        return (
                    <Form className='login-form'>
                        <img src={require('../../assets/images/logomain.png').default} 
                            alt='main logo' className='login-form-img'/>
                        <div className='form-title'>
                            ورود
                        </div>
                        <div className="form-group">
                            <Field type="text" name="userName" className="form-control" placeholder="نام کاربری"/>
                            <ErrorMessage name="userName" component="div" className='error'/>
                        </div>
                        <div className="form-group">
                            <Field type="password" name="password" className="form-control" placeholder="رمز عبور"/>
                            <ErrorMessage name="password" component="div" className='error'/>
                        </div>
                        <Button variant='success' type="submit" className='login-submit'>
                            {loading ?
                                <Loader
                                    type="Puff"
                                    color="#bb7"
                                    height={20}
                                    width={20}
                                    timeout={3000} //3 secs
                                />
                                :
                                'ورود'
                            }
                        </Button>
                        {loginFailed && <div className="error loginFailed">اطلاعات نادرست است</div>}
                    </Form>
        );
    }

    return (
        <div className='login-page'>
            <div className='login-form-container'>
                <Formik
                    initialValues={{ userName: '', password: '' }}
                    validationSchema={FormValidator}
                    onSubmit={doLogin}
                >
                    <LoginForm/>
                </Formik>
            </div>
        </div>

    );
};

export default Login;