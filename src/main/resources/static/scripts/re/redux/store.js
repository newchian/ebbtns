/**
 * redux最核心的存储store对象模块
 */

const {createStore, applyMiddleware} = Redux;
const thunk = ReduxThunk.default;
const {combinedReducers} = Reducers;

this.store = createStore(combinedReducers, composeWithDevTools(applyMiddleware(thunk)));





