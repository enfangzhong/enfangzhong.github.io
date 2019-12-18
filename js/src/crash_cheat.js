<!--崩溃欺骗-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/images/hert.png");
         document.title = '页面奔溃啦! ╭(°A°`)╮ ';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/images/hert.png");
         document.title = '(ฅ>ω<*ฅ)咦又好了,皮一下很开心hhh' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });