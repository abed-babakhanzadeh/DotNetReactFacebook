﻿import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function ActivitiesList() {
    const { activityStore } = useStore();
    const {deleteActivity,activities, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

  return (
      <Segment>
          <Item.Group divided>
              {activities.map(activity => (
                  <Item key={activity.id}>
                      <Item.Content>
                          <Item.Header as='a'>{activity.title}</Item.Header>
                          <Item.Meta>{activity.date}</Item.Meta>
                          <Item.Description>
                              <div>
                                  {activity.description }
                              </div>
                              <div>
                                  {activity.city} , {activity.venue }
                              </div>
                          </Item.Description>
                          <Item.Extra>
                              <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='جزئیات' color='blue' />
                              <Button
                                  name={activity.id }
                                  loading={loading && target === activity.id}
                                  onClick={(e) => handleActivityDelete(e, activity.id)}
                                  floated='right'
                                  content='حذف'
                                  color='red' />
                              <Label basic content={activity.category }/>
                          </Item.Extra>
                          
                      </Item.Content>
                  </Item>
              )) }
          </Item.Group>
      </Segment>
  );
}

export default observer( ActivitiesList);