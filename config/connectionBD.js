const { Pool } = require('pg');

const pool = new Pool({

    connectionString: process.env.DATABASE_URL ||
        'postgres://ozbuyqzatxyhiu:2957f7311820d93a695979c03029a9ae77265f472a3eac603d44596128690f3e@ec2-52-207-47-210.compute-1.amazonaws.com:5432/dbohrj79v1la0m',
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool