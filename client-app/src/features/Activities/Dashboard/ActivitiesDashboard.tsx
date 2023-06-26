import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivitiesList from './ActivitiesList';
import React, {useEffect} from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

function ActivitiesDashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])

    if(activityStore.loadingInitial) return<LoadingComponent content='در حال بارگذاری ...'/>
    
    
    return (
        <Grid>

            <Grid.Column width='10'>
                <ActivitiesList />
            </Grid.Column>

            <Grid.Column width='5'>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm />}
            </Grid.Column>

        </Grid>
    );
}

export default observer( ActivitiesDashboard);