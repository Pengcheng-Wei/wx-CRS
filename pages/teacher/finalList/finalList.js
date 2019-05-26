Page({
  data: {
  
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      tId : options.tId
    })
    wx.request({
      url: 'http://localhost:8080/crs/teacher/checkResult.shtml',
      //定义传到后台的数据
      data: {
        tId: that.data.tId
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        that.setData({
          students: res.data.students,
        })
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  },
  backtCourse: function () {
    wx.request({
      url: 'http://localhost:8080/crs/teacher/updateParticiCnt.shtml',
      //定义传到后台的数据
      data: {
        tId: this.data.tId
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log("提交成功");
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
    wx.redirectTo({
      url: '/pages/teacher/queryCourses/queryCourses?tId=' + this.data.tId
    })
  }

});
