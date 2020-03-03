// 定义校验规则-手机
 export   const checkPhone = (rule,value,callback) =>{
    // 获取value
    // 定义正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if(reg.test(value)==true){
        callback();
    }else{
        callback(new Error('手机号码的格式不正确'))
    }
};
// 定义校验规则-邮箱
export   const checkEmail = (rule,value,callback) =>{
    // 获取value
    // 定义正则表达式
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if(reg.test(value)==true){
        callback();
    }else{
        callback(new Error('邮箱的格式不正确'))
    }
};