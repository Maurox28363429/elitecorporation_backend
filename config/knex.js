const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'elitecorporation',
    },
  },
};

const knex = require('knex');


const conexion = knex(config.development);
const db = {
  conexion: conexion,
  paginate: (tabla,page,limit) => {
    const offset = (page - 1) * limit;
    return conexion.from(tabla).limit(limit).offset(offset);
  },
  metaPaginate: (tabla,page,limit) => {
    limit = parseInt(limit);
    page = parseInt(page);
    const offset = (page - 1) * limit;
    const total =  conexion.count('* as total').from(tabla).first();
    
    let lastPage = Math.ceil(total.total / limit);
    if(isNaN(lastPage)){
      lastPage = 1;
    }
    return {
      total: total.total,
      per_page: limit,
      current_page: page,
      last_page: lastPage,
      from: offset,
      to: offset + limit,
    };
  },
}
module.exports = db;