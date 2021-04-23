

/****
 uni.request()封装
***/ 

const BASE_URL  ='https://www.uinav.com'
// const BASE_URL  ='https://api-ugo-dev.itheima.net'
// const BASE_URL  ='https://tcb-api.tencentcloudapi.com'
// const BASE_URL  ='https://ugo.botue.com'

export default  async function request ({ url,method,data,header={} }){
    uni.showLoading({
          title:'加载中...',
          mask:true
    })
        // 处理token 
        let token=uni.getStorageSync('token')
        if(token){
        header.Authorization =token 
        }

        let [error,res] =await uni.request({
            url: BASE_URL+url,
            header,
            method,
            data 
        })
        uni.hideLoading()
          if (!error) {
            const _data = {
            msg: res.data.meta,
            data: res.data.message
            }
        return _data
    }
}

// vue插件形式

const MyRequest ={
    install(Vue,opts){
      Vue.prototype.request =  request
    }
}

export { MyRequest }