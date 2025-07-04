// 用户数据

export default{
    namespaced:true,
    state() {
        return{
            // 用户信息 ,登录的时候可以将数据库返回的这些用户信息存入localstore，同时导入store仓库里的state
            // 这里还有为了持久化，还需要在根节点随时保证刷新后还能保存原来的数据
            profile:{
                id:'',
                email:'',
                user_name:'',
                male:'',
                user_id:'',
                user_role:'',
                user_status:'',
                token:'',
                refresh:'',
                realName:'',
                phone:'',
                _id:'',
                wxID:'',

            }
        }
    },
    mutations:{
        // 修改state,payload就是用户信息对象
        setUser(state,payload){
            state.profile = payload
        }
    }
}