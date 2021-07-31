import Vue from 'vue';
import Vuex from 'vuex';
import Localbase from 'localbase';

let db = new Localbase('vuetify-todo');
db.config.debug = false;
let TASKS = 'tasks';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: process.env.MIX_VUE_APP_TITLE,
        search: null,
        tasks: [],
        snackbar: {
            show: false,
            text: ""
        },
        snackbars: [],
        sorting: false
    },
    mutations: {
        setSearch(state, value) {
            state.search = value;
        },
        addNewTask(state, newTask) {
            state.tasks.push(newTask);
        },
        toggleTaskDone(state, id) {
            let task = state.tasks.filter((task) => task.id === id)[0];
            task.done = ! task.done;
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        updateTask(state, payload) {
            let task = state.tasks.filter((task) => task.id === payload.id)[0];
            task.title = payload.title;
            task.done = payload.done;
            task.dueDate = payload.dueDate;
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
        showSnackbarWithText(state, text) {
            state.snackbars.push(text);
        },
        toggleSorting(state) {
            state.sorting = !state.sorting;
        }
    },
    actions: {
        getTasks(context) {
            axios.get('api/items').then((response) => {
                let tasks = response.data;
                context.commit('setTasks', tasks);
            }).catch(error => {
                console.log(error);
            });
        },
        addNewTask(context, newTaskTitle) {
            let newTask = {
                title: newTaskTitle
            };
            axios.post('api/item/store', {new_item: newTask}).then(() => {
                context.commit('showSnackbarWithText', "Task Added !");
            }).catch(error => {
                console.log(error);
            });
            context.commit('addNewTask', newTask);
        },
        toggleTaskDone(context, id) {
            let task = context.state.tasks.filter((task) => task.id === id)[0];
            axios.put('api/item/' + id, {
                updated_item: {
                    done: ! task.done
                }
            }).then(() => {
                context.commit("showSnackbarWithText", "Task Toggled !");
            }).catch(error => {
                console.log(error);
            });
            context.commit('toggleTaskDone', id);
        },
        setTasks(context, tasks) {
            axios.post('api/items', {items: tasks});
            context.commit('setTasks', tasks);
        },
        updateTask(context, payload) {
            let task = context.state.tasks.filter((task) => task.id === payload.id)[0];
            axios.put('api/item/' + task.id, {
                updated_item: {
                    title: payload.title,
                    done: payload.done,
                    dueDate: payload.dueDate
                }
            }).then(() => {
                context.commit("showSnackbarWithText", "Task Updated !");
            }).catch(error => {
                console.log(error);
            });
            context.commit("updateTask", payload);
        },
        deleteTask(context, id) {
            let task = context.state.tasks.filter((task) => task.id === id)[0];
            axios.delete('api/item/' + task.id).then(() => {
                context.commit('showSnackbarWithText', "Task Deleted !");
            }).catch(error => {
                console.log(error);
            });
            context.commit('deleteTask', id);
        }
    },
    getters: {
        tasksFiltered(state) {
            if (!state.search) {
                return state.tasks;
            }
            return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()));
        }
    }
})
