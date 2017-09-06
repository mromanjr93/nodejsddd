import * as amqp from 'amqplib';
export default class AmqpConnection {
    static connection = null;
    static connect() {
        if (AmqpConnection.connection == null) {
            AmqpConnection.connection = amqp.connect('amqp://localhost')
                .then((conn) => {                                        
                    return conn.createChannel();
                });
        }

        return AmqpConnection.connection;
    }
}