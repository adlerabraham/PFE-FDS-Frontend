import React from 'react';
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

function LoginForm() {
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

                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder='Username' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder='Password' />
                    </Form.Item>
                    <Form.Item className='form-options'>
                        <Form.Item name="remember" valuePropName="checked" className='form-remember'>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <div className='forgot-password'>
                            <div className='ant-form-item-control-input'>
                                <MailOutlined />
                                <Typography.Link href="#"
                                    target='_blank'>
                                    Mot de passe oublié?
                                </Typography.Link>
                            </div>
                        </div>

                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            CONNEXION
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
}

export default LoginForm