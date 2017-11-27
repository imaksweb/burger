<?php

    $name = $_POST['name'];
    $phone = $_POST['tel'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $block = $_POST['block'];
    $room = $_POST['room'];
    $floor = $_POST['floor'];
    $comment = $_POST['comment'];
    $pay = $_POST['pay-option'];
    $disturb = isset($disturb) ? 'НЕТ' : 'ДА';

    $mail_message = '
    <html>
    <head>
    <title>Заявка</title>
    </head>
    <body>
    <h2>Заказ</h2>
    <ul>
    <li>Name:' . $name . '</li>
    <li>Телефон:' . $phone . '</li>
    <li>Улица:' . $street . '</li>
    <li>Дом:' . $house . '</li>
    <li>Корпус:' . $block . '</li>
    <li>Квартира:' . $room . '</li>
    <li>Этаж:' . $floor . '</li>
    <li>Комментарий:' . $comment . '</li>
    <li>Способ оплаты:' . $pay . '</li>
    <li>Нужно ли перезванивать:' . $disturb . '</li>
    </ul>
    </body>
    </html>';


    $headers = "From: Администратор сайта <mrburger.maksweb.ru>\r\n".
    "MIME-Version: 1.0" . "\r\n".
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('ivashthestampede01@gmail.com', 'Заказ', $mail_message, $headers);
    
    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else {
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка";
    }

    echo json_encode($data);

?>