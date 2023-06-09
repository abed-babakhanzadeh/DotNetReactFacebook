import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, HeaderContent, List } from 'semantic-ui-react';

function App() {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5053/api/Activities/').then(response => {
            console.log(response);
            setActivities(response.data);
        })
    },[])
  return (
    <div>

    <Header as='h2' icon='users' content='پارسی گرام'/>
              <List>
                  {activities.map((activity: any) => (
                      <List.Item key={activity.id}>
                          {activity.title}:{activity.description}
                      </List.Item>
                  )) }
              </List>

    </div>
  );
}

export default App;
