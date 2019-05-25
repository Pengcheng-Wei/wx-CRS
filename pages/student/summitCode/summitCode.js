// pages/student/summitCode/summitCode.js
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
    this.setData({
      tId : options.tId,
      sId : options.sId

    })
    



  },
  onToastChanged: function () {
    this.setData({
      toastHidden: true
    });
  },
  randomNumInput: function(e){
    this.setData({
      randomNum: e.detail.value
    })
  },
  summit: function(e){
    var that = this;
    
    wx.request({
      url: 'http://localhost:8080/crs/student/checkRandomNum.shtml',
      //定义传到后台的数据
      data: {
        tId: that.data.tId,
        
        sId: that.data.sId,
        
        randomNum: that.data.randomNum
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data.result);
        
        if(res.data.result == true){
          wx.showToast({
            title: '成功！',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          for(var i=0;i<1000;i++)
            for (var j = 0; j < 10000; j++);
          wx.navigateBack({
            delta: 1,
          })
        }
        else{
          wx.showToast({
            title: '验证码错误！',
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