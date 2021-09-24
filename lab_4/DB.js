const util = require('util')
const ee = require('events')

let db_data = [
    {'id': 1, 'name': 'knvklnvlkdnvkld'},
    {'id': 2, 'name': 'klmlkmklmop'},
    {'id': 3, 'name': 'asdasdasdqweqwe'},
    {'id': 4, 'name': 'eewrwfevferdwc'},
    {'id': 5, 'name': 'knjnbiuvcytxckmojn'}
];

function DB()
{
    this.post = (newLine) =>
    {
        db_data.push(newLine)
    }

    this.get = () =>
    {
        return db_data
    }

    this.delete = (id) =>
    {
        let index = db_data.findIndex(x => x.id === id)
        let elementJson = db_data[index]
        db_data.splice(index, 1)

        return elementJson;
    }

    this.put = (newLine) =>
    {
        let index = db_data.findIndex(x => x.id)
        if (index !== -1)
        {
            db_data[index] = JSON.parse(newLine)
            return true
        }

        return false
    }
}

util.inherits(DB, ee.EventEmitter)

exports.DB = DB