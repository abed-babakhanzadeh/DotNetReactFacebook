import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = [];
    activityRegistery = new Map<string, Activity>();
    selectedActivity: Activity | undefined=undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).sort((a,b)=>
        b.MiladiDate.getDate() - a.MiladiDate.getDate());
    }

    loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await agent.Activities.list();
            this.activities = activities;
            this.setLoadingInitial(false)
        } catch (e) {
            console.log(e);
            this.setLoadingInitial(false)
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            /*this.loadingInitial = true;*/
            try {
                activity = await agent.Activities.details(id);
                this.selectedActivity = activity;
                return activity;
            } catch (e) {
                console.log(e);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistery.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    //selectActivity = (id: string) => {
    //    this.selectedActivity = this.activityRegistery.get(id);
    //}

    //cancelSelectActivity = () => {
    //    this.selectedActivity = undefined;
    //}

    //openForm = (id?: string) => {
    //    id ? this.selectActivity(id) : this.cancelSelectActivity();
    //    runInAction(() => {
    //        this.editMode = true;
    //    })

    //}

    //closeForm = () => {
    //    this.editMode = false;
    //}

    createActivity = async (activity: Activity | {
        venue: string;
        MiladiDate: Date;
        city: string;
        description: string;
        PersianDate: string;
        id: string;
        title: string;
        category: string
    }) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistery.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity | {
        venue: string;
        MiladiDate: Date;
        city: string;
        description: string;
        PersianDate: string;
        id: string;
        title: string;
        category: string
    }) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistery.set(activity.id, <Activity>activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delet(id);
            runInAction(() => {
                this.activityRegistery.delete(id);
/*                if (this.selectedActivity?.id === id) this.cancelSelectActivity();*/
                this.loading = false;
            })
        } catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }

    }
}