export function bytesToSize(bytes) {
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0B';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};