const async = require('async')
const rpc = require('rpc-websockets').Client

const client = new rpc('ws://localhost:4000')

client.on('open', () =>
{
    async.parallel(
        {
            square: (callback) =>
            {
                client.call('square', [5, 3])
                    .catch(error =>
                    {
                        callback(error, null)
                    })
                    .then(r =>
                    {
                        callback(null, r)
                    })
            },
            sum: (callback) =>
            {
                client.call('sum', [5, 9])
                    .catch(error =>
                    {
                        callback(error, null)
                    })
                    .then(r =>
                    {
                        callback(null, r)
                    })
            },
            mul: (callback) =>
            {
                client.call('mul', [1, 3])
                    .catch(error =>
                    {
                        callback(error, null)
                    })
                    .then(r =>
                    {
                        callback(null, r)
                    })
            },
            fib: (callback) =>
            {
                client.login({login: 'smw', password: '777'})
                    .then(isLogin =>
                    {
                        if (isLogin)
                        {
                            client.call('fib', [5])
                                .catch(error =>
                                {
                                    callback(error, null)
                                })
                                .then(r =>
                                {
                                    callback(null, r)
                                })
                        }
                        else
                        {
                            callback('login error', null)
                        }
                    })

            },
            fact: (callback) =>
            {
                client.login({login: 'smw', password: '777'})
                    .then(isLogin =>
                    {
                        if (isLogin)
                        {
                            client.call('fact', [5])
                                .catch(error =>
                                {
                                    callback(error, null)
                                })
                                .then(r =>
                                {
                                    callback(null, r)
                                })
                        }
                        else
                        {
                            callback('login error', null)
                        }
                    })

            },

        },
        (e, r) =>
        {
            if (e)
            {
                console.error(e)
            }
            else
            {
                console.log(r)
                client.close()
            }

        }
    )
})