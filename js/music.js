/**
 * Created by jiangqian on 2017/9/19.
 */



    $(function(){
        /******图片轮播******/
        var n = $('#rslides li').length;
        var m = 0;
        var musicTimer02 = setInterval(function(){
            m++;
            if(m<n){
                $('#rslides li.music-slide').removeClass('music-slide');
                $('#rslides li').eq(m).addClass('music-slide');
            }else{
                m=0;
                $('#rslides li.music-slide').removeClass('music-slide');
                $('#rslides li').eq(m).addClass('music-slide');
            }
        },3000);


        /*****音乐播放器*****/
        function musicT(time){
            var m,s,t;
            var d = new Date(time*1000);
            m = d.getMinutes()>=10?d.getMinutes():0+''+d.getMinutes();
            s = d.getSeconds()>=10?d.getSeconds():0+''+d.getSeconds();
            t = m+':'+s;
            return t;
        }
        var mTime = {musicTime:'00:00',currentTime:'00:00'};
        var musicTime;
        var bgm = $('#bgm')[0];
        var wline = parseFloat($('#musicline').css('width'));
        var scale ;
        bgm.load();
        bgm.onloadedmetadata=function(){
            musicTime = bgm.duration;
            mTime.musicTime=musicT(bgm.duration);
            console.log(musicTime);
        };
        bgm.ontimeupdate = function(){
            scale = bgm.currentTime/ musicTime;
            //console.log($scope.mTime);
            //$scope.$watch('mTime',function(){
            mTime.currentTime = musicT(bgm.currentTime);
            $('.currentTime').html(mTime.currentTime);
            $('.longTime').html(mTime.musicTime);
            console.log(bgm.currentTime);
            //});
            $('#music-line-model').css('width',wline*scale+'px');
            if(scale<=0||scale>=1){
                $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
                //$('.music-rotate').removeClass('music-playing');
            }else{
                $(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
                //$('.music-rotate').addClass('music-playing');
            }

        };

        $('#playOrpause').click(function(){
            if(bgm.paused){
                bgm.play();
                $(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
                $('.music-rotate').addClass('music-playing');
            }else{
                bgm.pause();
                $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
                $('.music-rotate').removeClass('music-playing');

            }
        });
        $('#musicline').on('click',function(e){
            var x = e.offsetX;
            //bgm.pause();
            bgm.currentTime = parseInt(x/wline*musicTime);
            //bgm.play();
            console.log(x,wline,musicTime,x/wline*musicTime);
            //if(x<=0){
            //    bgm.currentTime = 0;
            //}
            //if(x>=wline){
            //    bgm.currentTime = musicTime;
            //}
        })
    })


