

Page({
  data: {
   
    
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      cnt:options.cnt,
      currentCnt:options.currentCnt,
      tId:options.tId
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
  buqian: function (event) {
    var that = this;
    var sId = event.currentTarget.dataset.sid;
    var tId = this.data.tId;
    wx.request({
      url: 'http://localhost:8080/crs/teacher/updateResign.shtml',
      //定义传到后台的数据
      data: {
        tId: tId,
        sId: sId,
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '补签成功！',
          icon: 'succes',
          duration: 1000,
          mask: true
        });  
        var num = ++that.data.currentCnt;
        that.setData({
          currentCnt: num
        });
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    });
    
  },
summitla:function(){
  wx.redirectTo({
    url: '/pages/teacher/finalList/finalList?tId='+this.data.tId,
  })
}
},

);