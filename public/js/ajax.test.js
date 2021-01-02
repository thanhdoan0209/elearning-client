(function ($) {
    $('#btnAddStudents').on('click', function () {
        console.log("CLICKED add students")
        $.ajax({
            url: "/users/ajax-users",
            method: "GET",
            data: { classCode: $('#classCode').text().replace(/\s/g, '') },
            success: (res) => {
                console.log(res)
                res.forEach((student, index) => {
                    $('#myDropdown').append("<a class='studentTag' id=" + index + ">" + student.username + "</a>")
                });
            }
        })
    })
})(jQuery);

(function ($) {
    $('#btnAddTeachers').on('click', function () {
        console.log("CLICKED add techers")
        $.ajax({
            url: "/users/ajax-teachers",
            method: "GET",
            data: { classCode: $('#classCode').text().replace(/\s/g, '') },
            success: (res) => {
                console.log(res)
                res.forEach((teacher, index) => {
                    $('#myDropdown2').append("<a class='teacherTag' id=" + index + ">" + teacher.username + "</a>")
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
    $(document).on('click', '.teacherTag', function () {
        const student = ($(this).text());
        $('#myInput2').val(student);
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
                    $('#listStudents').prepend(
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

(function ($) {
    $('#btnAddTeacher').on('click', function () {
        console.log("CLICKED add student")
        const data = {
            username: $('#myInput2').val(),
            classCode: $('#classCode').text().replace(/\s/g, '')
        }
        $.ajax({
            url: "/users/ajax-teachers/add",
            method: "POST",
            data: data,
            success: (res) => {
                console.log(res.username)
                if (res != "teacher-existed") {
                    $('#listTeachers').prepend(
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

function popUpDelete(classCode) {
    console.log(classCode)
    var r = confirm("Do you want to delete a class ?");
    if (r == true) {
        // $.ajax({
        //     url: "/classes/class-detail/delete/" + classCode,
        //     method: "DELETE",
        //     data: classCode,
        //     success: (res) => {
        //         console.log(res)
        //         document.getElementById(classCode).remove();
        //     }
        // })
    } else {
    }
};