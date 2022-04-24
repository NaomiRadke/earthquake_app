import { createStore } from 'vuex';

export default createStore({
    state: {
        curr_data: {},
        test: 'hello world'
    },
    mutations: {
        updateCurrData(state, payload) {
            state.curr_data = payload.data;
        },
        updateTest(state, payload) {
            state.test = payload.msg;
        }
    },
    getters: {
        getCurrData(state) {
            return state.curr_data;
        },
        getTest(state) {
            return state.test;
        }
    },
    actions: {
        UPDATE_CURRDATA(context, payload) {
            context.commit('updateCurrData', payload)
        },
        UPDATE_TEST(context, payload) {
            context.commit('updateTest', payload)
        }
    }
})