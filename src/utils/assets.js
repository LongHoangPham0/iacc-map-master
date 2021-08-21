const baseUrl = window.location.href

//File mô hình 3D
export const ModelEnum = {
  headquarters: baseUrl + 'public/3d/big-building/scene.gltf',
  normalOrg: baseUrl + 'public/3d/small-building/scene.gltf'
}

//File âm thanh
export const AudioEnum = {
  marker: baseUrl + 'public/sound/marker.mp3',
  waitan: baseUrl + 'public/sound/waitan.mp3',
  warning: baseUrl + 'public/sound/warning1.mp3',
  detail: baseUrl + 'public/sound/info-detail.mp3'
}

//File hình ảnh

export const ImageEnum = {
  head: baseUrl + 'public/image/navigator.png',
  'green-point': baseUrl + 'public/image/green-point.png',
  'yellow-point': baseUrl + 'public/image/yellow-point.png'
}

//File ảnh đại diện

export const AvatarEnum = {
  older: baseUrl + 'public/image/avatar/old',
  staff: baseUrl + 'public/image/avatar/staff'
}
