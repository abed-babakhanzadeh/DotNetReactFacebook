import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, HeaderContent, List } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivitiesDashboard from '../../features/Activities/Dashboard/ActivitiesDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
    const {activityStore } = useStore();

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

  if(activityStore.loadingInitial) return<LoadingComponent content='در حال بارگذاری ...'/>

  return (
    <Fragment>

          <Navbar  />

          <Container style={{marginTop:'4em'} }>
              <ActivitiesDashboard />
          </Container>

      </Fragment>
  );
}

export default observer(App);
