// pages/register/tregister/tRegister.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      this.data.openid = options.openid,
      this.data.role = options.role
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   //处理accountInput的触发事件
  accountInput: function (e) {
    var username = e.detail.value;//从页面获取到用户输入的用户名/邮箱/手机号
    if (username != '') {
      this.setData({ tId: username });//把获取到的密码赋值给date中的password
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
        pswd: this.data.tId,
        email: this.data.tId,
        role: this.data.role,
        openid: this.data.openid,
        rememberMe: false
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.isExisted == true) {
          wx.showToast({
            title: '绑定成功！',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/teacher/queryCourses/queryCourses?sId=' + that.data.sId
            })
          }, 1000)
        } else if (res.data.isExisted == false) {
          wx.showToast({
            title: '查无此人！',
            icon: 'loading',
            duration: 1000,
            mask: true
          });
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })

  }
})