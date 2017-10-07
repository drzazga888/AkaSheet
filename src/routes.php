<?php
// Routes

$app->group('/api', function(){
    // user
    $this->get('/user', Sracz\Controller\User::class . ':allUsers');
    $this->get('/user/{id}', Sracz\Controller\User::class . ':info');
    $this->post('/user', Sracz\Controller\User::class . ':register');

    // receipt
    $this->get('/transaction', Sracz\Controller\Transaction::class . ':all');
    $this->get('/transaction/{id}', Sracz\Controller\Transaction::class . ':details');
    $this->post('/transaction', Sracz\Controller\Transaction::class . ':add');
    $this->put('/transaction/{id}', Sracz\Controller\Transaction::class . ':update');
    $this->put('/transaction/{id}/pay', Sracz\Controller\Transaction::class . ':pay');
    $this->delete('/transaction/{id}', Sracz\Controller\Transaction::class . ':delete');

    // session
    $this->post('/session', Sracz\Controller\Session::class . ':login');
    $this->delete('/session', Sracz\Controller\Session::class . ':logout');

    // recipient
    $this->get('/recipient', Sracz\Controller\Recipient::class . ':all');
    $this->get('/recipient/{recipient_id}', Sracz\Controller\Recipient::class . ':info');
    $this->post('/recipient', Sracz\Controller\Recipient::class . ':add');
    $this->put('/recipient/{id}', Sracz\Controller\Recipient::class . ':update');
    $this->delete('/recipient/{id}', Sracz\Controller\Recipient::class . ':delete');
    $this->post('/recipient/{recipient_id}/user/{user_id}', Sracz\Controller\Recipient::class . ':assignUser');
    $this->delete('/recipient/{recipient_id}/user/{user_id}', Sracz\Controller\Recipient::class . ':removeUser');

    // summary
    $this->get('/summary', Sracz\Controller\Summary::class . ':generate');
})->add(new \Sracz\Middleware\Authorization($app));

$app->get('/', Sracz\Controller\Main::class . ':main');

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
