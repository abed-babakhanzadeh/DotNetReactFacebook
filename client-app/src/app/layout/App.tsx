import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivitiesDashboard from '../../features/Activities/Dashboard/ActivitiesDashboard';
import { observer } from 'mobx-react-lite';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/Activities/Form/ActivityForm";

function App() {
  return (
    <Fragment>

          <Navbar  />

          <Container style={{marginTop:'4em'} }>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/activities" element={<ActivitiesDashboard />} />
                  <Route path="/createActivity" element={<ActivityForm />} />
              </Routes>
          </Container>

      </Fragment>
  );
}

export default observer(App);
