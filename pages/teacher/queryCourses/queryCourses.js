
var util = require("../../../utils/util.js");
let time = util.formatDate(new Date());
let date = util.getDates(7, time);
var dateV = date[0];


Page({
  data: {
    dateTime: dateV.time,
    dateWeek: dateV.week,

  },
  onLoad: function (options) {
    var that = this;

    that.setData({
      tId: options.tId
    });
    

    wx.request({
      url: 'http://localhost:8080/crs/teacher/teacherQueryCourses.shtml',
      //定义传到后台的数据
      data: {
        id:that.data.tId,
        //id: that.data.sid,
        week: '周一'
        //week: dateV.week 可用
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        that.setData({
          sc: res.data.sc,
          teacher: res.data.teacher

        })
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })

  },
  calling: function (event){
    
    var tId = event.currentTarget.dataset.tid;
    var className = event.currentTarget.dataset.classname;

    wx.redirectTo({
      url: '/pages/teacher/identifyCode/identifyCode?tId=' + tId + '&className=' + className,
    })
  }
}

);