var app = getApp()
Page({
  onLoad: function () {
    var flag = 0
    var arrhere = []
    var numb
    var left = 0
    var temp
    var name = '请添加新日程表'
    var index = wx.getStorageSync('index') //index begin from '1'
    var sg = wx.getStorageSync('sg')


    if (index && sg) {
      for (var j = 0; j < index; j++) {
        arrhere[j] = sg[j];
      }
      if (arrhere[0].leftDays > 0) {
        temp = arrhere[0].leftDays;
        left = temp;
        name = arrhere[0].name;
        for (var m = 0; m < index; m++) {
          if (index == 1)
            break;
          else if (temp > arrhere[m].leftDays && arrhere[m].leftDays > 0) {
            temp = arrhere[m].leftDays;
            left = temp;
            name = arrhere[m].name;
          }
        }
      }
    }
    else {
      name = "请添加新日程表";
      left = 0
    }
    flag = 1;
    this.setData({
      sgname: name,
      sgleft: left,
      'flag': flag
    })
  },

  onTap: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  ondeleteTap: function () {
    //
    wx.showToast({
      title: '已清空缓存',
      duration: 2000,
      success: function (res) {
        wx.clearStorageSync('sg'),
          wx.clearStorageSync('index'),
          app.globalData.temp = []
      },
    })
  },
  onPullDownRefresh() {
    var that = this;
    this.onLoad();
    if (this.data.flag) {
      wx.stopPullDownRefresh();
    }
  },
})
