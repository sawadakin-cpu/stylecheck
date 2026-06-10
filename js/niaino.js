// target blank
// const open_niaino_sub_window = function(n, e) {
//   const t = document.createElement('form');
//   t.method="post",
//   t.action = e||'https://web.niaino.jp/index';
//   t.target = '_blank';
//   const o = document.createElement('input');
//   o.type = 'hidden',
//   o.name = 'niaino_key',
//   o.value = n,t.appendChild(o),
//   document.body.append(t),t.submit(),t.remove()
// };

// niaino android
$(function() {
  // ai niaino
  let userAgent = window.navigator.userAgent.toLowerCase();
  console.log(userAgent);

  // niaino modal
  if (userAgent.match('android') && userAgent.match('palapp')) {
    // app && android
    $('#to-niaino').addClass('android');
  }
});
