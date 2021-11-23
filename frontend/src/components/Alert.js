import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const AlertNotification = ({color, text}) => {
    
    return (
        <>
            <Alert className='text-center' variant={color}>
                {text}
            </Alert>
        </>
        )
    }
    
    export default AlertNotification;