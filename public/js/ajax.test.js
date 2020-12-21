(function ($) {
    $('#testBtn').on('click', function () {
        console.log("CLICKED")
        $.ajax({
            url: "/classes/user",
            method: "GET",
            success: (res) => {
                console.log(res[1]);
                $('#test').html("2222222222");
            }
        })
    })
})(jQuery)