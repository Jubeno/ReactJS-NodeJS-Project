import React, { useEffect } from 'react';
import { Col, Container, Row, Tabs, Tab,  } from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import { useHistory } from 'react-router';
import { getToken } from '../../library/utilities/util/retrieve';
import SignIn from './frames/SignIn';
import SignUp from './frames/SignUp';
import './topStyles.scss';

const Top = ({ t }) => {
    const router = useHistory();

    useEffect(() => {
        const token = getToken();
        if(token) {
            // router.push('/homepage');
        }
    }, [])

    return (
        <Container fluid id="top-container">
            <Row className="h-100">
                <Col md={{ span: 3, offset: 5 }}>
                    <div className="tabs-wrapper">
                        <Tabs
                            fill justify
                            defaultActiveKey="signin" 
                            variant="pills"
                        >
                            <Tab eventKey="signin" title="Sign In">
                                <SignIn />
                            </Tab>
                            <Tab eventKey="signup" title="Sign Up">
                                <SignUp />
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default withNamespaces()(Top);