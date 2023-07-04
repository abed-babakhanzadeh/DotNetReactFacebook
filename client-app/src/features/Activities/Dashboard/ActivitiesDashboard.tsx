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
    const { loadActivities, activityRegistery } = activityStore
    useEffect(() => {
        if (activityRegistery.size <= 1) loadActivities();
    }, [activityRegistery.size, loadActivities])

    if(activityStore.loadingInitial) return<LoadingComponent content='در حال بارگذاری ...'/>
    
    
    return (
        <Grid>

            <Grid.Column width='10'>
                <ActivitiesList />
            </Grid.Column>
                <h2>فیلترینگ</h2>
            <Grid.Column width='5'>



            </Grid.Column>

        </Grid>
    );
}
//{ selectedActivity && !editMode && <ActivityDetails /> }
//{ editMode && <ActivityForm /> }
export default observer( ActivitiesDashboard);