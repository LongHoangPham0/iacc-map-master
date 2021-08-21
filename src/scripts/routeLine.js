import { parseRouteToPath } from '~/utils'
import EventBus from '~/utils/eventbus'
export default class RouteLine {
  constructor(scene, map, markerPoint, endPoint, startPosition, endPosition) {
    this.map = map
    this.scene = scene
    //Di chuyển đến vị trí của endPosition
    this.startPosition = startPosition
    this.endPosition = endPosition
    this.markerPoint = markerPoint
    this.endPoint = endPoint
    this.polyline = null
    this.passedPolyline = null
    this.timer = null
    this.emitter = EventBus.getInstance().emitter
    //https://lbs.amap.com/api/javascript-api/reference/route-search#AMap.Riding
    this.driving = new AMap.Walking({
      // policy: AMap.DrivingPolicy.LEAST_DISTANCE, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
      // ferry: 1, //Có thể sử dụng phà không
      // province: 'Thượng hải', // Chữ viết tắt tiếng Trung cho các tỉnh biển số xe
      // autoFitView:true
    })
  }
  create() {
    this.scene.panTo([this.endPosition.lng, this.endPosition.lat])
    // Lập kế hoạch tuyến đường điều hướng cho xe đạp theo kinh độ và vĩ độ của điểm đầu và điểm cuối
    this.driving.search(
      new AMap.LngLat(this.startPosition.lng, this.startPosition.lat),
      new AMap.LngLat(this.endPosition.lng, this.endPosition.lat),
      (status, result) => {
        if (status === 'complete') {
          if (result.routes && result.routes.length) {
            let data = parseRouteToPath(result.routes[0]).map(c => [
              c.lng,
              c.lat
            ])
            this.drawRoute(data)
          }
        } else {
          console.error('Không lấy được dữ liệu lái xe:' + result)
        }
      }
    )
    return this
  }
  drawRoute(data) {
    //Vẽ quỹ đạo
    this.polyline = new AMap.Polyline({
      map: this.map,
      path: data,
      isOutline: true,
      lineJoin: 'round',
      strokeColor: '#2979ff', //Màu đường kẻ
      strokeOpacity: 1, //Độ trong suốt của dòng
      strokeWeight: 10, //Chiều rộng dòng
      strokeStyle: 'solid' //Kiểu đường kẻ
    })
    this.passedPolyline = new AMap.Polyline({
      map: this.map,
      lineJoin: 'round',
      strokeColor: '#607d8b', //Màu đường kẻ
      strokeOpacity: 1, //Độ trong suốt của dòng
      strokeWeight: 10, //Chiều rộng dòng
      strokeStyle: 'solid' //Kiểu đường kẻ
    })
    let self = this,
      count = 0,
      currentCount
    this.markerPoint.marker.on('moving', e => {
      count++
      self.passedPolyline.setPath(e.passedPath)
    })
    this.markerPoint.marker.moveAlong(data, 60)
    this.timer = setInterval(() => {
      if (currentCount === count) {
        self.destroy()
        self.emitter.emit('routeLineMoveEnd', this.endPoint)
      } else {
        currentCount = count
      }
    }, 1 * 1000)
    return this
  }
  destroy() {
    this.timer && clearInterval(this.timer)
    this.map.remove([this.polyline, this.passedPolyline])
  }
}
