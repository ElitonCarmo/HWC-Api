export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Harvest Way Comex <noreply@hwcomex.com>',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
};
