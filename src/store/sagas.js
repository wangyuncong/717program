//中间件，在action到reducers添加一些逻辑，监听action，触发新的antion
import {takeEvery,takeLatest} from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import $http from '../utils/http'
import {getCookie} from '../utils/cookie'
import {DELIVERY_LIST,DELIVERY_LIST_ERR} from '../store/reducers'
//每一个saga就是一个sagagenerator函数
//获取邮寄列表
function* fetchDelivery(){
    try{
        let res = yield call($http.post,'/user/Mail/list',{token:getCookie('token')})
        yield put({
            type:DELIVERY_LIST,
            data:res
        })
    }
    catch(err){
        yield put({
            type:DELIVERY_LIST_ERR,
            data:res
        })
    }
}
//编辑邮寄列表
function* editDelivery(action){
    try{
        let res = yield call($http.post,'/user/Mail/editlist',{token:getCookie('token'),index:action.data})
        yield put({
            type:"EDIT_DELIVERY_INFO",
            data:res
        })
    }
    catch(err){
        yield put({
            type:"EDIT_DELIVERY_INFO_ERR",
            data:err
        })
    }
}
//删除邮寄列表
function* deleteDelivery(action){
    try{
        let res = yield call($http.post,'/user/Mail/deletelist',{token:getCookie('token'),index:action.data})
        console.log(res.leftList)
        if(res.success==1){
            yield put({
                type:"DELETE_DELIVERY_INFO",
                data:res.leftList
            })
        }else{
            yield put({
                type:"EDIT_DELIVERY_INFO_ERR",
                data:res
            })
        }
    }
    catch(err){
        yield put({
            type:"EDIT_DELIVERY_INFO_ERR",
            data:err
        })
    }
}
//获取省市区数据
function* fetchPCR(){
    try{
        let PCR=yield $http.get('/user/Mail/pcr');
        console.log(PCR)
        yield put({
            type:'PCR_DATA',
            data:PCR
        })
    }
    catch(err){
        console.log(err)
    }
    
}
function* watchDelivery(){
    yield takeEvery(['GET_DELIVERY_LIST'],fetchDelivery)
}
function* watchEditDelivery(){
    yield takeEvery(['EDIT_DELIVERY'],editDelivery)
}
function* watchdeleteDelivery(){
    yield takeEvery(['DELETE_DELIVERY'],deleteDelivery)
}
function* watchPCRdata(){
    yield takeEvery(['GET_PCR_DATA'],fetchPCR)
}
export default function* rootSaga(){
    yield [watchDelivery(),watchEditDelivery(),watchdeleteDelivery(),watchPCRdata()]
}
