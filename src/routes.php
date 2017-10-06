<?php
// Routes

$app->group('/api', function(){
    // user
    $this->get('/user', AkaSheet\Controller\User::class . ':allUsers');
    $this->get('/user/{id}', AkaSheet\Controller\User::class . ':info');
    $this->post('/user', AkaSheet\Controller\User::class . ':register');

    // receipt
    $this->get('/transaction', AkaSheet\Controller\Transaction::class . ':all');
    $this->get('/transaction/{id}', AkaSheet\Controller\Transaction::class . ':details');
    $this->post('/transaction', AkaSheet\Controller\Transaction::class . ':add');
    $this->put('/transaction/{id}', AkaSheet\Controller\Transaction::class . ':update');
    $this->delete('/transaction/{id}', AkaSheet\Controller\Transaction::class . ':delete');

    // session
    $this->post('/session', AkaSheet\Controller\Session::class . ':login');
    $this->delete('/session', AkaSheet\Controller\Session::class . ':logout');

    // recipient
    $this->get('/recipient', AkaSheet\Controller\Recipient::class . ':all');
    $this->get('/recipient/{recipient_id}', AkaSheet\Controller\Recipient::class . ':info');
    $this->post('/recipient', AkaSheet\Controller\Recipient::class . ':add');
    $this->put('/recipient/{id}', AkaSheet\Controller\Recipient::class . ':update');
    $this->delete('/recipient/{id}', AkaSheet\Controller\Recipient::class . ':delete');
    $this->post('/recipient/{recipient_id}/user/{user_id}', AkaSheet\Controller\Recipient::class . ':assignUser');
    $this->delete('/recipient/{recipient_id}/user/{user_id}', AkaSheet\Controller\Recipient::class . ':removeUser');
})->add(new \AkaSheet\Middleware\Authorization($app));

$app->get('/', AkaSheet\Controller\Main::class . ':main');

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
