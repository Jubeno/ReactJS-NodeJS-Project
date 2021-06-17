import React from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { NAVIGATION_LIST } from '../../constants';

const Navigation = (props) => {
    const route = useHistory();
    const { activeKey } = props;
    const onSelect = selectedKey => {
        route.push(selectedKey);
    };

    return (
        <Nav
            variant="pills"
            fill
            defaultActiveKey={activeKey}
            onSelect={onSelect}
        >
            {
                NAVIGATION_LIST.map(navItem => (
                    <Nav.Item key={navItem.id}>
                        <Nav.Link eventKey={navItem.eventKey}>{navItem.name}</Nav.Link>
                    </Nav.Item>
                ))
            }
        </Nav>
    );
}

export default Navigation;