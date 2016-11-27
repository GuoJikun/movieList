// $(function () {
    var pageIndex = 0;     //页面索引初始值
    var pageSize = 4;     //每页显示条数初始化，修改显示条数，修改这里即可
    var allCount =0;

    //分页，PageCount是总条目数，这是必选参数，其它参数都是可选
    

    //翻页调用
    function PageCallback(index, jq) {
        /*console.log($('#Pagination').attr('cur_url'));
        var urls = $('#Pagination').attr('cur_url');
        console.log(urls)*/
        InitTableSearch(index,$('#Pagination').attr('cur_urls'));
    }

    //请求数据
    function InitTableSearch(pageIndex,urls) {
        urls = 'https://api.douban.com/v2/movie/search?q=' + $('.form-control').val();
        $.ajax({
            type: "post",
            dataType: "jsonp",
            url:  urls,
            data: "count=" + pageSize + "&start=" + pageSize*(pageIndex + 1),//提交两个参数：pageIndex(页面索引)，pageSize(显示条数)
            success: function (data) {
                console.log(data)
                allcount = data.count;
                $(".movieList").empty();
                for (var i = 0; i < data.subjects.length; i++) {
                    var casts = [];
                    for (var j = 0; j < data.subjects[i].casts.length; j++) {
                        casts.push(data.subjects[i].casts[j].name)
                    };
                   casts.join('、');
                    var item = '<div class="list-group">' +
                            '<a href="detail.html#'+data.subjects[i].id+'" class="list-group-item">' +
                            '<div class="media">' +
                            '<div class="media-left" >' +
                            '<img src="' + data.subjects[i].images.small + '" alt="' + data.subjects[i].title + '" height="140px"></div>' +
                            '<div class="media-body">' +
                            '<h4 class="media-heading">' + data.subjects[i].title + '</h4>' +
                            '<span class="badge pull-right">' + data.subjects[i].rating.average + '</span>' +
                            '<p>' +
                            '类型：' +
                            '<span>' + data.subjects[i].genres.join("、") + '</span>' +
                            '</p>' +
                            '<p>' +
                            '导演：' +
                            '<span>' + data.subjects[i].directors[0].name + '</span>' +
                            '</p>' +
                            '<p>' +
                            '主演：' +
                            '<span>' + casts + '</span>' +
                            '</p>' +
                            '<p>' +
                            '上映年份：' +
                            '<span>' + data.subjects[i].year + '</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>';
                    $('.movieList').append(item);
                }
                $('#Pagination').attr('cur_urls',urls);
            },
            error: function(){
                alert('error')
            }
        });
    };
    $("#Pagination").pagination(allCount, {
        callback: PageCallback,
        prev_text: '上一页',       //上一页按钮里text
        next_text: '下一页',       //下一页按钮里text
        items_per_page: pageSize,  //显示条数
        num_display_entries: 5,    //连续分页主体部分分页条目数
        current_page: pageIndex,    //当前页索引
        num_edge_entries: 2        //两侧首尾分页条目数
    });
    
// });