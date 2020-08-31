import axios from 'axios'

export function request(config) {
  // 创建axios的实例
  const instance =axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:5000
  })

  // axios的拦截器
  //  请求拦截的作用
  instance.interceptors.request.use(config =>{
    return config
  },error => {

    })
  // 响应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },err =>{
    console.log(err);
  })
  return instance(config)
}
