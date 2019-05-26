// pages/teacher/identifyCode/identifyCode.js
var randomNum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
var interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      randomNum:randomNum
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      tId: options.tId,
      className:options.className
    });
    
    wx.request({
      url: 'http://localhost:8080/crs/teacher/teacherCalling.shtml',
      //定义传到后台的数据
      data: {
        tId: that.data.tId,
        className:that.data.className,
        randomNum: randomNum
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        
        that.setData({
          cnt: res.data.cnt
        });

        interval = setInterval(function () {
          wx.request({
            url: 'http://localhost:8080/crs/teacher/getcurrentCnt.shtml',
          //定义传到后台的数据
          data: {
            tId: '2010001'         
          },
          method: 'post',//定义传到后台接受的是post方法还是get方法
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            that.setData({
              currentCnt: res.data.currentCnt
            });

          },
      fail: function (res) {
        console.log("调用API失败");
      }
    });
        }, 3000)
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    });

    

  },

  finishCalling:function(){
    wx.request({
      url: 'http://localhost:8080/crs/teacher/finishCalling.shtml',
      //定义传到后台的数据
      data: {
        flag: 1
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log("结束点名成功");
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    });
    clearInterval(interval);
    wx.redirectTo({
      url: '/pages/teacher/checkResult/checkResult?cnt=' + this.data.cnt + '&currentCnt=' + this.data.currentCnt + '&tId=' + this.data.tId,
    })
  }

})