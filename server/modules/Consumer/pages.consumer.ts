import AmqpConnection from '../../shared/Helpers/amqp.connection';

AmqpConnection.connect()
    .then((ch) => {

        ch.prefetch(1);
        ch.consume('pages', (msg) => {            
            setTimeout(() => {
                console.log('Mensagem recebida: %s', msg.content.toString());
                ch.ack(msg);
            },2000);
        });
    });