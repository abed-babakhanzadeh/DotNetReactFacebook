import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, HeaderContent, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivitiesDashboard from '../../features/Activities/Dashboard/ActivitiesDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            setActivities(response);
            setLoading(false);
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
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
        //activity.id
        //    ? setActivities([...activities.filter(x => x.id !== activity.id)])
        //    : setActivities([...activities, {...activity, id:uuid()}]);
        //setEditMode(false);
        //setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delet(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        })
        
    }


  if(loading) return<LoadingComponent content='در حال بارگذاری ...'/>

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
                  submitting={submitting }

              />
          </Container>

      </Fragment>
  );
}

export default App;
