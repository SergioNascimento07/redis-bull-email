import nodemailer from 'nodemailer'
import mailConfig from '../../config/mail'
// import mailQueue from './Queue';

var transport = nodemailer.createTransport(mailConfig);

export default transport