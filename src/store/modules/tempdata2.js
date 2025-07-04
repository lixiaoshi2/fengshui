// 分类的数据

export default{
    namespaced:true,
    state() {
        return{
            //分类列表、
            data1:'12',
        }
    },
    mutations:{
        // 修改state,payload就是用户信息对象
        setdata1(state,payload){
            state.data1 = payload
        }
    }
}