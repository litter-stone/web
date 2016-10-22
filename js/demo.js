function $1(id){
            return document.getElementById(id);
        }
        // 获取歌词 解析歌词
        var text = $1("lrcnt").innerHTML;
        var liDoms = $1("c_lists").children;
        var html = "";
        var arr = text.split("\n");
        var regx = /^\s+|\s$/;
        var index = 0;
        // 遍历拿到没行的歌词
            for(var i = 0;i<arr.length;i++){
                // 去掉两边的空格
                var text1 = arr[i].replace(regx,"");
                // 歌词时间和歌词分开
                var arr1 = text1.split("]");
                // 拿到歌词时间
                var lrcTime = arr1[0].substring(1);
                // 分割分钟和秒钟
                var arr2 = lrcTime.split(":");
                var m = parseInt(arr2[0]*60+arr2[1]*1);
                // 拿到歌词歌
                var lrcs = arr1[1];
                // 拼接歌词
                if(lrcs){
                    html += "<li id = "+m+">"+lrcs+"</li>";
                }
                $1("lrclist").innerHTML =html;
            }
        function play(){
            if($1("audio").paused){
                $1("audio").play();
                $1("music").className = "p_music rotate";
            }else{
                $1("audio").pause();
                $1("music").className = "p_music";
            };
            var liDom = $1("lrclist").children;
            $1("audio").addEventListener("timeupdate",function(){
                var  t = parseInt(this.currentTime);
                var dom = $1(t);
                for(var i = 0;i<liDom.length;i++){
                    if(liDom[i]==dom){
                        for(var j = 0;j<liDom.length;j++){
                            liDom[j].className = "";
                        };
                        dom.className = "hover";
                        $1("lrclist").style.top =(-40*i+120)+"px";
                    };
                };
            });
        }
        first();
        // 第一页动画
        function first(){
            $1("lrclist").className = "animated  flipInY";
        }
        // 第二页动画
        function two(){
            $1("c_img").className = "animated bounceInDown";
            $1("comment").className = "animated slideInLeft";
        }
        // 第三页动画
        function three(){
            $1("w_img").className = "animated rotateInDownLeft";
            $1("mark").className = "animated slideInLeft";
            $1("watch").className = "animated slideInRight";
        }
        // 根据索引执行动画
        function car(index){
            if(index ==0){
                first();
            }else if(index==1){
                two();
            }else if(index==2){
                three();
            }
        }
        // // 点击切换上一页
        var w = liDoms[0].offsetWidth;
        $("#prev").tap(function(){
            index--;
            del(index+1);
            if(index <0){
                index = 2
            }
            $1("c_lists").style.left = -w*index+"px";
            car(index);
        })
        // 点击切换下一页
        $("#next").tap(function(){
            index++;
            del(index-1);
            if(index >2){
                index = 0;
            }
            $1("c_lists").style.left = -w*index+"px";
            car(index);
        })
        // 执行完一遍后删除动画
        function del(index){
            var doms = liDoms[index].children;
           for(var i = 0;i<doms.length;i++){
                doms[i].className = "";
           }
        }



