(function ($) {
    $('#testBtn').on('click', function () {
        console.log("CLICKED")
        $.ajax({
            url: "/users",
            method: "GET",
            success: (res) => {
                console.log(res[1]);
                $('#test').html("2222222222");
            }
        })
    })
})(jQuery);

(function ($) {
    $('#btnAddStudents').on('click', function () {
        console.log("CLICKED add students")
        $.ajax({
            url: "/users/ajax-users",
            method: "GET",
            success: (res) => {
                res.forEach((student, index) => {
                    $('#myDropdown').append("<a class='studentTag' id=" + index + ">" + student.username + "</a>")
                });
            }
        })
    })
})(jQuery);

(function ($) {
    $(document).on('click', '.studentTag', function () {
        const student = ($(this).text());
        $('#myInput').val(student);
    })
})(jQuery);

(function ($) {
    $('#btnAddStudent').on('click', function () {
        console.log("CLICKED add student")
        const data = {
            username: $('#myInput').val(),
            classCode: $('#classCode').text().replace(/\s/g, '')
        }
        $.ajax({
            url: "/users/ajax-users/add",
            method: "POST",
            data: data,
            success: (res) => {
                console.log(res.username)
                if (res != "user-existed") {
                    $('.sortby').prepend(
                        "<li class='clearfix' id='student'>\
                        <div class='course-thumbnail'>\
                            <img src="+ '/images/use_img/avatar.jpg' + " class='course-media-img' alt=''>\
                        </div >\
                        <div class='simi-co'>\
                            <h3><a href='/users/user-detail/"+ res.username + "'>" + res.username + "</a>\
                            </h3>\
                        </p>\
                        </div >\
                    </li >"
                    )
                }
            }
        })
    })
})(jQuery);



