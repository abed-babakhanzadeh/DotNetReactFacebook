import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function Navbar({openForm }: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight:'10px'}} />
                    پارسی گرام
                </Menu.Item>
                <Menu.Item name='فعالیتهای اخیر' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='ایجاد فعالیت'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
};