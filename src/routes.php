<?php
// Routes

$app->group('/api', function(){
    // user
    $this->get('/user', AkaSheet\Controller\User::class . ':allUsers');
    $this->get('/user/{id}', AkaSheet\Controller\User::class . ':info');
    $this->post('/user', AkaSheet\Controller\User::class . ':register');

    // receipt
    $this->get('/receipt', AkaSheet\Controller\Receipt::class . ':all');
    $this->get('/receipt/{id}', AkaSheet\Controller\Receipt::class . ':details');
    $this->post('/receipt', AkaSheet\Controller\Receipt::class . ':add');
    $this->put('/receipt/{id}', AkaSheet\Controller\Receipt::class . ':update');
    $this->delete('/receipt/{id}', AkaSheet\Controller\Receipt::class . ':delete');

    // session
    $this->post('/session', AkaSheet\Controller\Session::class . ':login');
    $this->delete('/session', AkaSheet\Controller\Session::class . ':logout');
});

$app->get('/', function ($request, $response, $args) {
    $file = dirname(__DIR__).DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'index.html';
    if(!file_exists($file)) {
        return $response->withStatus(404);
    }
    $body = $response->getBody();
    $body->write(file_get_contents($file));
    return $response;
});