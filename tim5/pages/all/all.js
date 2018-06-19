var app = getApp()
Page({
  data: {
    array: [],
    flag: 0,
    index: 0

  },
  onLoad: function (event) {
    var temp1 = {};
    var flag = 0;
    var that = this;

    if (!wx.getStorageSync('sg')) {
      var array = [];
      that.setData({
        'array': array
      })
    }
    else {
      temp1 = wx.getStorageSync('sg');
      console.log(temp1);
      that.setData({
        array: temp1
      })
    }
    flag = 1;
    this.setData({
      'flag': flag
    })
  },

  onPullDownRefresh() {
    var that = this;
    this.onLoad();
    if (that.data.flag) {
      wx.stopPullDownRefresh();
    }
  },


  singleDelete: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          var temp = {};
          var index = wx.getStorageSync('index');
          var Index = e.currentTarget.id;
          temp = wx.getStorageSync('sg');
          temp.splice(Index, 1);
          app.globalData.temp = temp;
          wx.setStorageSync('sg', temp);
          index--;
          app.globalData.index--;
          wx.setStorageSync('index', index);
          wx.showToast({
            title: '已删除！',
            duration: 2000,
          });
          that.onLoad();
        } else if (sm.cancel) {
          wx.showToast({
            title: '已取消！',
            duration: 2000
          })
        }
      }
    })
  }

})