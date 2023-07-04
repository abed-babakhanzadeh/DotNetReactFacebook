import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';


function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial/*, openForm, cancelSelectActivity */ } = activityStore;
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    let img = generatePath("/assets/categoryImages/:image", { "image": `${ activity?.category }.jpg`})

    if(loadingInitial || !activity) return <LoadingComponent/>
    return (
      <Card fluid>
          <Image src={img}/>
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
                    <Button as={Link} to={`/manage/${activity.id}` } /*onClick={() => openForm(activity.id)}*/ basic color='blue' content='ویرایش' />
                    <Button as={ Link } to='/activities' /*onClick={cancelSelectActivity }*/ basic color='grey' content='لغو' />
              </Button.Group>
          </Card.Content>
      </Card>
    );
}

export default observer( ActivityDetails);