/*
 * @Description: file content
 * @Author: Wenmin He
 * @Date: 2020-07-12 14:36:48
 * @LastEditors: Wenmin He
 * @LastEditTime: 2021-02-25 15:10:56
 */
import store from '@/store';
import utils from '@/utils';

// 计算定位
const setPosition = (el, position, geometry) => {
  const {
    w,
    h,
  } = utils.getDomSize(el);
  const {
    view,
  } = store.state;
  let positionInfo = {};
  let xCenter;
  let yCenter;
  if (geometry.type === 'point') {
    xCenter = geometry.x;
    yCenter = geometry.y;
  } else if (geometry.type === 'polygon') {
    xCenter = geometry.extent.center.x;
    yCenter = geometry.extent.center.y;
  }
  const screenPoint = view.toScreen({
    type: 'point',
    x: xCenter, // geometry.x,
    y: yCenter, // geometry.y,
    // z: 15,
    hasZ: true,
    spatialReference: view.spatialReference,
  });
  const {
    x: geoX,
    y: geoY,
  } = screenPoint;
  switch (position) {
    case 'left':
      positionInfo = {
        left: geoX - w,
        top: geoY - h / 2,
      };
      break;
    case 'right':
      positionInfo = {
        left: geoX,
        top: geoY - h / 2,
      };
      break;
    case 'top':
      positionInfo = {
        left: geoX - w / 2,
        top: geoY - h,
      };
      break;
    case 'bottom':
      positionInfo = {
        left: geoX - w / 2,
        top: geoY + h,
      };
      break;
    case 'right-bottom':
      positionInfo = {
        left: geoX,
        top: geoY,
      };
      break;
    case 'right-top':
      positionInfo = {
        left: geoX,
        top: geoY - h,
      };
      break;
    case 'left-top':
      positionInfo = {
        left: geoX - w,
        top: geoY - h,
      };
      break;
    case 'left-bottom':
      positionInfo = {
        left: geoX - w,
        top: geoY,
      };
      break;
    default:
      break;
  }
  if (positionInfo.top >= (2400 - h)) positionInfo.top = 2400 - h;
  if (positionInfo.top <= 0) positionInfo.top = 0;

  el.style.left = `${positionInfo.left}px`;
  el.style.top = `${positionInfo.top}px`;
  el.style.position = 'absolute';
};

class DomFollowMap {
  constructor() {
    // 用来缓存订阅者列表
    this.followList = {};
    // this.viewWatchEvent = null;
  }

  // 预留扩展的冗余代码，暂时没什么有用
  getList() {
    return this.followList;
  }

  // 注册。将订阅者放在缓存列表中，并对弹窗元素进行定位计算
  subscribe(id, el, graphic, position, type) {
    const page = type || store.state.type;
    // 因为现在需求是：点击多次撒点，也始终只显示一个弹窗，所以在这里做了注销处理。
    // 如果点击多次撒点均保留弹窗的话，在弹窗的点击事件上再调用注销方法。
    // 一般来说订阅、取消订阅、发布都是外部触发调用，而调度中心只是负责提供功能
    let pageFollowList = this.followList[page];
    if (!pageFollowList) pageFollowList = [];

    const followInfo = {
      id,
      el,
      graphic,
      position,
    };
    let isSame = null;

    pageFollowList.find((item, index) => {
      if (followInfo.graphic === item.graphic) {
        isSame = index;
      }
      return followInfo.graphic === item.graphic;
    });

    if (isSame !== null) {
      pageFollowList.splice(isSame, 1, followInfo);
    } else {
      pageFollowList.push(followInfo);
    }
    this.followList[page] = pageFollowList;
    setPosition(el, position, graphic.geometry);
  }

  // 注销。就是把订阅者删掉
  unSubscribe() {
    this.followList.delete(this.type);
  }

  // 发布操作。当地图extent改变时，要处理的逻辑
  publish() {
    // const {
    //   view,
    // } = store.state;
    // if (this.viewWatchEvent) this.viewWatchEvent.remove();
    // this.viewWatchEvent = view.watch('extent', () => {
    const keysArr = Object.keys(this.followList);
    if (keysArr.length === 0) return;
    keysArr.map((type) => {
      this.followList[type].map((item) => {
        const {
          el,
          graphic,
          position,
        } = item;
        setPosition(el, position, graphic.geometry);
      });
    });
    // });
  }
}

window.DomFollowMap = new DomFollowMap();
