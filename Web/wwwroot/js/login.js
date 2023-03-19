$(document).ready(function(){
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    signInButton.addEventListener('click', function() {
        $('.container').removeClass("right-panel-active");
    })
    signUpButton.addEventListener('click', function() {
        $('.container').addClass("right-panel-active")
    })
    /*
    $('#signUp').click(function(){
        $('.container').addClass("right-panel-active")
    })
    */

    //show - hide Password
    var showHide = $('.show_hide');
    $.each(showHide, function() {
        $(this).click(function() {     
            if($(this).siblings('input').attr("type") === "password") {
                $(this).siblings('input').attr("type", "text");
                $(this).addClass("fa-eye").removeClass("fa-eye-slash");
            }
            else {
                $(this).siblings('input').attr("type", "password");
                $(this).removeClass("fa-eye").addClass("fa-eye-slash");
            }
        })
    })

    var indicator = document.querySelector(".indicator.pw");
    var indimail = document.querySelector(".indicator.mail");
    var iconText = document.querySelector(".icon-text.pw");
    var input = document.getElementById('pw');
    var text = document.getElementById('text');
    input.addEventListener("keyup", function() {
      indicator.classList.add('active');
    let val = input.value;
    if(val.length <= 6){
      text.innerText = `Password is weak`;
      iconText.style.color = "#FF6333";
    }
    else if(val.length <= 12) {
      text.innerText = "Password is medium";
      iconText.style.color = "#cc8500";
    }
    else {
      text.innerText = "Password is strong";
      iconText.style.color = "#22C32A";
    }

    if(val == ""){
      indicator.classList.remove("active");
      iconText.style.color = "#A6A6A6";
    }
  });

  var mail = document.getElementById('mail');
  mail.addEventListener("keyup", function(){
    indimail.classList.add('active');
    if($('#mail').val().includes("@") === false) {
      $('#textMail').text("Định dạng email không hợp lệ");
      $('.icon-text.mail').css({
        "color": "#CC8500"
      });
    }
    else {
      indimail.classList.remove("active");
    }
    if($('#mail').val() == "")
      indimail.classList.remove("active");
  })


  const account = [];
  const SignUpBt = $('#SignUpBt');
  const SignInBt = $('#SignInBt');
  SignUpBt.click(function(){
    var name = $(this).siblings('input').first().val();
    var sdt = $(this).siblings('input').eq(1).val();
    var email = $(this).siblings().eq(4).children('input').val();
    var pw = $(this).siblings().eq(5).children().children('input').val();
    var pw2 = $(this).siblings().eq(6).children().children('input').val();
    var ndung = "";
    var isOK = 1;
    if(email != null && email.includes("@") === false) {
      ndung = ndung + "Email không hợp lệ\n";
      email = "";
    }
    if(pw != pw2) {
      ndung = ndung + "Mật khẩu 2 không chính xác\n";
      isOK = 0;
    }
    if(sdt == "") {
      ndung += "Quý khách chưa có số điện thoại\n";
      isOK = 0;
    }
    if(isOK == 1){
      dangKi(name, sdt, email, pw);
      toast({title:"Đăng kí thành công", message: "Chào mừng quý khách đã đến với cửa hàng", type: "success", duration: 2000 });
    }
    else
      toast({title:"Đăng kí không thành công", message: ndung, type: "error", duration: 2000 })
  })
  SignInBt.click(function(){
    var sdt = $(this).siblings('input').first().val();
    var email = $(this).siblings('input').eq(1).val();
    var password = $(this).siblings('input').eq(2).val();
    var i = dangNhap(sdt, email, password)
    if(i == 1)
      toast({title:"Đăng nhập thành công", message: "Đăng nhập thành công", type: "success", duration: 2000 });
    else if(i == -1)
      toast({title:"Đăng nhập thất bại", message:"Sai mật khẩu", type:"warning", duration:2000});
    else
      toast({title:"Đăng nhập thất bại", message:"Tài khoản chưa được đăng kí", type:"error", duration:2000});
  })
  function toast({ title = "", message = "", type = "info", duration = 2000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast_close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast-${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast_icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast_body">
                          <h3 class="toast_title">${title}</h3>
                          <p class="toast_msg">${message}</p>
                      </div>
                      <div class="toast_close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  }
  function dangNhap(sdt, email, password){
    for(i = 0; i < account.length; i++){
      if((account[i].sdt == sdt || account[i].email == email) && account[i].password == password)
        return 1;
      else if((account[i].sdt == sdt || account[i].email == email) && account[i].password != password)
        return -1;
    return 0;
    }
  }
  function dangKi(name, sdt, email, pw) {
    var acc = {
      name: name,
      sdt: sdt,
      email: email,
      password: pw
    };
    account.push(acc);
  }
})