import { observer } from 'mobx-react-lite';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import ActivitiesList from './ActivitiesList';

function ActivitiesDashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore

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