// pages/register/tregister/tRegister.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    toastHidden: true, //吐司  
    toastText: '',//吐司文本  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openid = options.openid,
    this.data.role = options.role
  },

 
  //处理accountInput的触发事件
   accountInput: function (e) {
    var userid = e.detail.value;//从页面获取到用户输入的用户名/邮箱/手机号
    if (userid != '') {
      this.setData({ account: userid });//把获取到的密码赋值给date中的password
    }
  },
  onToastChanged: function () {
    this.setData({
      toastHidden: true
    });
  },
  //处理register的触发事件
  register: function (e) {
    var that = this;
    
    wx.request({
      url: 'http://localhost:8080/crs/u/submitLogin.shtml',
      //定义传到后台的数据
      data: {
        pswd: this.data.account,
        email: this.data.account,
        role: this.data.role,
        openid: this.data.openid,
        rememberMe:false
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

          that.setData({
            toastHidden: false, //吐司  
          });
          
          wx.setStorageSync("sessionId", res.data.sessionId);
          console.log(wx.getStorageSync("sessionId"));
          wx.redirectTo({
            url: '/pages/student/queryCourses/queryCourses?sid=' + that.data.account
          })
        
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  },
 
})