$(function () {
    load()
    $('#thing').focus(function () {
        if (this.value == '添加ToDo') {
            this.value = '';
            this.style.color = "#333";
        }
    })
    $('.title').find('input').on({
        keydown: function (e) {
            var keycode = e.keycode || e.which;
            if (keycode == 13 && this.value !== '' && this.value !== '添加ToDo') {
                var local = getDate()
                var a = this.value
                local.push({ value: a, done: false })
                saveDate(local)
                load()
                // $('.ing').find('ul').prepend('<li>' + ' <input type="checkbox"></input>' + ' <p>' + a + '</p>' + ' <a href="javascript:;"></a>' + '</li>')
                this.value = "添加ToDo";
                this.style.color = "#666";
            }
        },
        click: function () {
            if (this.value == "添加ToDo") {
                this.value = '';
                this.style.color = "#666";
            }
        }
    }
    )
    $('.ing,.done').find('ul').on('click', 'input', function () {
        var data = getDate()
        var index = $(this).siblings('a').attr('id')
        data[index].done = $(this).prop("checked")
        saveDate(data)
        load()

    })
    $('.ing,.done').find('ul').on('click', 'a', function () {
        var data = getDate()
        var index = $(this).attr('id')
        data.splice(index, 1)
        saveDate(data)
        load()
    })

    $('#thing').blur(function () {
        if (this.value == '') {
            this.value = "添加ToDo";
            
            
        }
    })
    function getDate() {
        var data = localStorage.getItem('todolist')
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data))

    }
    function load() {
        var todoCount = 0
        var doneCount = 0
        var data = getDate()
        $('.ing,.done').find('ul').empty()
        $.each(data, function (i, n) {
            if (n.done) {
                $('.done').find('ul').prepend('<li>' + ' <input type="checkbox" checked="checked" ></input>' + ' <p>' + n.value + '</p>' + ' <a href="javascript:;" id=' + i + ' ></a>' + '</li>')
                doneCount++
            } else {
                $('.ing').find('ul').prepend('<li>' + ' <input type="checkbox"></input>' + ' <p>' + n.value + '</p>' + ' <a href="javascript:;" id=' + i + ' ></a>' + '</li>')
                todoCount++
            }
        })
        if (todoCount !== 0) {
            $('.ingCount').addClass('lei')

            $('.ingCount').text(todoCount)

        } else {
            $('.ingCount').removeClass('lei')
            $('.ingCount').text('')
        }
        if (doneCount !== 0) {
            $('.doneCount').addClass('lei')
            $('.doneCount').text(doneCount)

        } else {
            $('.doneCount').removeClass('lei')
            $('.doneCount').text('')
        }
    }

})