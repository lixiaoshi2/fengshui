// 购物车的数据
export default{
    namespaced:true,
    state () {
        return{
          
            data1:'123',
            data2:'',
          
        }
      },
      mutations:{
        // 修改state,payload就是用户信息对象
        setTempdata(state,payload){
            state.tempdata = payload
        }
    }
}
