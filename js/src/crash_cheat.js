<!--崩溃欺骗-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/images/hert.png");
         document.title = '别走! ╭(°A°`)╮ ';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/images/hert.png");
         document.title = '真乖hhh (ฅ>ω<*ฅ)' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });