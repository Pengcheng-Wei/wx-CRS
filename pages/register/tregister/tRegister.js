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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      this.setData({ account: username });//把获取到的密码赋值给date中的password
    }
  },
  //处理pwdBlur的触发事件
  pwdBlur: function (e) {
    var pwd = e.detail.value;//从页面获取到用户输入的密码
    if (pwd != '') {
      this.setData({ password: pwd });//把获取到的密码赋值给date中的password
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
        rememberMe: true
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            toastHidden: false, //吐司  
          });
          
          wx.redirectTo({
            url: '/pages/teacher/queryCourses/queryCourses'
          })
          
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })

  }
})