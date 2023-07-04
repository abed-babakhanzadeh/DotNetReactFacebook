import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { create } from 'domain';


function ActivityForm() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    const { selectedActivity /*closeForm*/, createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore
    const { id } = useParams<{id:string}>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        MiladiDate: new Date(Date.now()),
        PersianDate: '',
        city: '',
        venue: ''
    });
    
    //const initialState = selectedActivity ?? {
    //    id: '',
    //    title: '',
    //    category: '',
    //    description: '',
    //    MiladiDate: new Date(Date.now()),
    //    PersianDate: '',
    //    city: '',
    //    venue:''
    //}

    useEffect(() => {
        if(id) loadActivity(id).then(activity=> setActivity(activity!))
    }, [id, loadActivity])


    if(loadingInitial) return<LoadingComponent content='بارگزاری فعالیت' />



    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }

        activity.id ? updateActivity(activity) : createActivity(activity);
    }
    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({...activity, [name] : value })
    // }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        //const activity = {...activity, [name] : value };

        if (name === 'MiladiDate' && !Date.parse(value)) {
            activity.MiladiDate = new Date(Date.now());
        }

        setActivity({...activity, [name] : value })
    }


    return (
      <Segment clearing>
          <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Input placeholder='عنوان' value={activity.title} name='title' onChange={handleInputChange} />
              <Form.TextArea placeholder='توضیحات' value={activity.description} name='description' onChange={handleInputChange} />
              <Form.Input placeholder='دسته بندی' value={activity.category} name='category' onChange={handleInputChange} />
              <Form.Input placeholder='تاریخ شمسی' value={activity.PersianDate} name='PersianDate' onChange={handleInputChange} />
              <Form.Input laceholder='تاریخ میلادی' value={activity.MiladiDate} name='MiladiDate' disabled onChange={handleInputChange} />
              <Form.Input placeholder='شهر' value={activity.city} name='city' onChange={handleInputChange} />
              <Form.Input placeholder='منطقه' value={activity.venue} name='venue' onChange={handleInputChange} />
              <Button loading={loading} floated='right' positive type='submit' content='ارسال' />
                <Button as={ Link } to='/activities' /*onClick={closeForm}*/ floated='right' type='button' content='لغو' />
          </Form>
      </Segment>
  );
}

export default observer(ActivityForm);