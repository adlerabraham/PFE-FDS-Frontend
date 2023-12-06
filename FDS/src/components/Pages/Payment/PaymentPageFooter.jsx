import { NavLink } from 'react-router-dom';
import { Space } from 'antd';
import 'antd/dist/antd.css'
import '../../Footer/Footer.scss'

function PaymentPageFooter() {
    return (
        <div className='footer'>
            <Space>
                <NavLink className="footer-link">Mentions legales</NavLink>|
                <NavLink className="footer-link">A propos</NavLink>|
                <NavLink className="footer-link">Aide</NavLink>|
            </Space>
        </div>
    );
}

export default PaymentPageFooter