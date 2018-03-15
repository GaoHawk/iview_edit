import app from './modules/app.js';
import user from './modules/user.js';
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex);

function ajaxData(url, cookies, store) {
    const promise = new Promise(function(resolve, reject) {
        Vue.prototype.$http({
                method: 'GET',
                url: url,
                // headers: {
                //     'Authorization': 'Bearer ' + cookies
                // },
                // params: params
            }).then(response => {
                console.log(response)
                resolve(response.data);
            })
            .catch(function(err) {
                reject(new Error(err));
                console.log('catch', err)
            })
    });
    return promise;
}

const store = new Vuex.Store({
    state: {
        menuList: [],
    },
    mutations: {
        updateMenuList(state, data) {
            // let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            console.log(data)
        },
        setAvator(state, path) {
            localStorage.avatorImgPath = path;
        },
    },
    actions: {
        getTabledataAsync({ commit }, page) {
            let cookies = localStorage.cookies || '';
            let store = this;
            let params;
            let tableName = '';
            let url = 'http://192.168.1.14/index.php/fxadmin/user/user_lst';
            return new Promise(function(resolve, reject) {
                resolve(
                    ajaxData(url, cookies, store).then(function(json) {
                        // commit('updateMenuList', json);
                        console.log(json)
                        return json;
                    }, function(error) {
                        console.log('出错了', error);
                    })
                );
            })
        },
        getListdataAsync({ commit }, page) {
            let cookies = localStorage.cookies || '';
            let store = this;
            let params;
            let tableName = '';
            let url = 'http://ceshi.danews.cc/index.php/api';
            return new Promise(function(resolve, reject) {
                resolve(
                    ajaxData(url, cookies, store).then(function(json) {
                        // commit('updateMenuList', json);
                        console.log(json)
                        return json;
                    }, function(error) {
                        console.log('出错了', error);
                    })
                );
            })
        }
    },
    // modules: {
    //     app,
    //     user
    // }
});

export default store;