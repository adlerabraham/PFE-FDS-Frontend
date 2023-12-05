import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Space,
    Typography,
    Image,
} from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../api/ApiEndpoints';
import './Login.scss';


function LoginForm() {

    const [usern, setUsername] = useState("");
    const [paswd, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login] = useLoginMutation()

    //const user = useSelector(state => console.log(state));

    const handleSubmite = async (event) => {

        const credentials = {
            username: usern,
            password: paswd
        }

        try {
            const RequestResult = await login(credentials).unwrap()

            dispatch(setCredentials({
                access: RequestResult.access,
                refresh: RequestResult.refresh,
                group: RequestResult.group,
                username: RequestResult.username
            }))

            setUsername('')
            setPassword('')
            const userGroup = localStorage.getItem('group')

            switch (userGroup.toLowerCase()) {
                case 'teacher':
                    navigate('/teacherDashboard')
                    break;
                case 'student':
                    navigate('/studentDashboard')
                    break;
                case 'coordinator':
                    navigate('/coordinatorDashboard')
                    break;
                default:
                    navigate('/')
                    break;
            }


        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='form-container'>
            <div className='div-form '>
                <div className='user-group-icon'>
                    <Image
                        alt='icone'
                        src='./group-of-users-icon.png'
                        height={80}
                        width={80} />
                </div>

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    validateTrigger="onChange"
                    onFinish={handleSubmite}

                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Entrez votre identifiant!' }]}
                    >
                        <Input
                            placeholder='Identifiant'
                            value={usern}
                            onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Entrez votre mot de passe!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder='Mot de passe'
                            value={paswd}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item className='form-options'>
                        <Form.Item name="remember" valuePropName="checked" className='form-remember'>
                            <Checkbox style={{ fontWeight: 'normal' }}>Se souvenir de moi</Checkbox>
                        </Form.Item>
                        <div className='forgot-password'>
                            <div className='ant-form-item-control-input'>
                                <MailOutlined />
                                {/*  */}
                                <Typography.Link href="#"
                                    target='_blank' style={{ fontWeight: 'normal' }}>
                                    Mot de passe oublié?
                                </Typography.Link>
                            </div>
                        </div>

                    </Form.Item>
                    <Form.Item >
                        <Button className="custom-button1" type="primary" htmlType="submit">
                            CONNEXION
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
}

export default LoginForm