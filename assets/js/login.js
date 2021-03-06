$(function() {
    // 去注册链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 去登录链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取相关对象：form, layer
    var form = layui.form
    var layer = layui.layer
    // 自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })

    // 利用ajax提交注册表单数据
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {username:$('#form_reg [name=username]').val(), 
        password:$('#form_reg [name=password]').val()};
        $.post('/api/reguser',data,
        function(res) {
            if (res.status !== 0) {
                return layer.msg('注册失败！ ' + res.message)
            }
            layer.msg('注册成功！')
            $('#link_login').click()
        });
    })

    // 利用ajax提交登录表单数据
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})