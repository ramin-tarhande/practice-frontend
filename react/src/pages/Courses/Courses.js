import { useEffect, useState } from "react";
import './Courses.css';
import {Row,Col,Card,Button} from 'react-bootstrap'
import {Spin} from 'antd'
import service from '../../services'

const Courses=()=>{
    const [list,setList]=useState([]);
    const [loadDone,setLoadDone]=useState(false);
    const [failure,setFailure]=useState(false);

    const loadData=()=>{
        
        service.getAll().then(r=>{
            console.log('courses :>> ', r);
            setList(r);
        }).catch(e=>{
            console.log('error :>> ', e);
            setFailure(true);
        }).finally(()=>{
            setLoadDone(true);
        });
    }

    useEffect(()=>{
        loadData();    
    },[]);

    const CourseCards=()=>{
        return (
            <Row className="cards-row" xs={1} sm={2} md={4} lg={5}>
                {list.map((x) => (
                    <Col key={x.id}>
                        <Card>
                            <Card.Img variant="top" src={x.image.url}/>
                            <Card.Body>
                                <Card.Title>{x.title}</Card.Title>
                                <Card.Text>
                                    <strong>مدت زمان:</strong>
                                    {` ${x.duration} ساعت`}
                                </Card.Text>
                                <Card.Text>
                                    <strong>مدرس:</strong>
                                    {` ${x.mentor}`}
                                </Card.Text>
                                <Button variant="success">
                                    <a className="btn-a" href="https://www.roshdana.com">
                                    جزئیات دوره                                      
                                    </a>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );    
    }
    //return (<>hellllllllllllllllllllj</>);
    return (
        <div className="courses-page">
            <img src={require('../../assets/images/simple.jpg').default} className="general-image" alt='general courses'/>

            <div className='courses-title'>لیست دوره ها</div>

            <div className='cards-container'>
                <Spin spinning={!loadDone} size="large" tip="بارگذاری دوره ها">
                    <CourseCards/>
                </Spin>
                {failure&& <p className="failure">خطا در دریافت اطلاعات</p>}
            </div>
        </div>
    );
};

export default Courses;