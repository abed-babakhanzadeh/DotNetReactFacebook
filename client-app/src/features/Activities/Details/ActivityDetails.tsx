﻿import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, cancelSelectActivity } = activityStore;

    if(!activity) return <LoadingComponent/>
  return (
      <Card fluid>
          <Image src={'/assets/categoryImages/'+activity.category+'.jpg' }/>
          <Card.Content>
              <Card.Header>{activity.title }</Card.Header>
              <Card.Meta>
                  <span >{activity.PersianDate }</span>
              </Card.Meta>
              <Card.Description>
                  {activity.description }
              </Card.Description>
          </Card.Content>
          <Card.Content extra>
              <Button.Group widths='2'>
                  <Button onClick={() => openForm(activity.id)} basic color='blue' content='ویرایش' />
                  <Button onClick={cancelSelectActivity } basic color='grey' content='لغو' />
              </Button.Group>
          </Card.Content>
      </Card>
  );
}

export default ActivityDetails;