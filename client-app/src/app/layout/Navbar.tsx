import { observer } from 'mobx-react-lite';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


function Navbar() {
    const { activityStore } = useStore();
    const { selectedActivity, openForm } = activityStore;
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight:'10px'}} />
                    پارسی گرام
                </Menu.Item>
                <Menu.Item name='فعالیتهای اخیر' />
                <Menu.Item>
                    <Button onClick={()=>openForm()} positive content='ایجاد فعالیت'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer( Navbar);