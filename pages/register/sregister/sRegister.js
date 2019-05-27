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
    this.setData({
      openid : options.openid,
      role : options.role
    })

  },

 
  //处理accountInput的触发事件
   accountInput: function (e) {
    var userid = e.detail.value;
    if (userid != '') {
      this.setData({ sId: userid });
    }
  },

  //处理register的触发事件
  register: function (e) {
    var that = this;
    
    wx.request({
      url: 'http://localhost:8080/crs/u/submitLogin.shtml',
      //定义传到后台的数据
      data: {
        pswd: this.data.sId,
        email: this.data.sId,
        role: this.data.role,
        openid: this.data.openid,
        rememberMe:false
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        wx.showToast({
          title: '绑定成功！',
          icon: 'succes',
          duration: 1000,
          mask: true
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/student/queryCourses/queryCourses?sId=' + that.data.sId
          })
        }, 1000)
          
        
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  },
 
})