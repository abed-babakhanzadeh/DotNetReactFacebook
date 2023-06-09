import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, HeaderContent, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivitiesDashboard from '../../features/Activities/Dashboard/ActivitiesDashboard';
import { v4 as uuid } from 'uuid';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5053/api/Activities/').then(response => {
            setActivities(response.data);
        })
    }, [])

    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }
    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleOpenForm(id? : string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }
    function handleCloseForm() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: Activity) {
        activity.id
            ? setActivities([...activities.filter(x => x.id !== activity.id)])
            : setActivities([...activities, {...activity, id:uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter(x => x.id !== id)]);
    }


  return (
    <Fragment>

          <Navbar openForm={handleOpenForm} />

          <Container style={{marginTop:'4em'} }>
              <ActivitiesDashboard
                  activities={activities}
                  selectedActivity={selectedActivity}
                  selectActivity={handleSelectActivity}
                  cancelSelectActivity={handleCancelSelectActivity}
                  editMode={editMode}
                  openForm={handleOpenForm}
                  closeForm={handleCloseForm}
                  createOrEdit={handleCreateOrEditActivity}
                  deleteActivity={handleDeleteActivity}

              />
          </Container>

      </Fragment>
  );
}

export default App;
