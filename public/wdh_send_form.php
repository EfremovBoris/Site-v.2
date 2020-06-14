<?php

/*
    if (isset($_POST["RequestFrm"])) {
    $headers.="Date: ".date('D, d M Y h:i:s O')."\r\n";
    $body = "Имя: ".$_POST["name"]."\n";$msg .= "Сообщение: ".$_POST["msg"]."\n";
*/
/*
Пока что не срабатывают проверки заполнения полей - ПОФИКСИТЬ!!!
Может нужно обнулять значения переменных?
*/

    
if (isset($_POST["form_fio"]) && isset($_POST["form_email"]) ) {     
    
    $to_form_email = "lovekamski@mail.ru";
    $subject = "Заявка с сайта БОРИС-ТРИП";
    $body = "ФИО: " . $_POST['form_fio'] . "\r\n";
    $body .= "E-mail: " . $_POST['form_email'] . "\r\n";

    $body .= "Комментарии: " . $_POST['form_comments'] . "\r\n";
    $body .= "Телефон: " . $_POST['form_phone'] . "\r\n";
    $body .= "Со страницы: " . $_POST['src-page'] . "\r\n";

    $body .= "Дата обращения: ".date('D, d M Y h:i:s O')."\r\n";
    
    $headers = "Content-type: text/plain; charset=utf-8\r\n";
    $headers .= "From: info@boris-trip.com\r\n";
    $headers .= "Bcc: kamarkadash@gmail.com\r\n";   

    if ( mail($to_form_email, $subject, $body, $headers) ) {
        echo 'Сообщение отправлено!';
    }
    else{
        echo 'Ошибка отправки сообщения.';
    }
} else {
        echo 'Вы забыли указать ваши данные!!!';
}
?>