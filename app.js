//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      
      success(res) {
        /*
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://localhost:8080/crs/student/testController.shtml',
            data: {
              js_code: res.code,
            },
            success(res) {
              console.log(res.data.openid);
              console.log(res.data.bind);
              wx.setStorageSync("sessionId", res.data.sessionId);
              console.log("sessionid=" + res.data.sessionId);
              var that = res;
              if (res.data.bind == "false") {
                wx.redirectTo({
                  url:'/pages/index/index'
                  //url: '/pages/register/sregister/sRegister?openid=' + res.data.openid + '&role=student',
                })
              }
              else {
                wx.request({
                  url: 'http://localhost:8080/crs/u/submitLogin.shtml',
                  //定义传到后台的数据
                  data: {
                    pswd: res.data.student.sId,
                    email: res.data.student.sId,
                    openid: res.data.openid,
                    rememberMe: false,
                    JSESSIONID:wx.getStorageSync("sessionId")
                  },
                  method: 'post',//定义传到后台接受的是post方法还是get方法
                  header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
                  },
                  success: function (res) {
                    wx.redirectTo({
                      url: '/pages/student/queryCourses/queryCourses?sid=' + that.data.student.sId
                    })
                  },
                  fail: function (res) {
                    console.log("调用API失败");
                  }
                });

              }
            },
            fail() {
              console.log("失败!!!")
            }
          })

        } else {
          console.log('登录失败！' + res.errMsg)
        }
        */
      }
    }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})