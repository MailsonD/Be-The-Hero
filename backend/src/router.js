const e = require('express');
const OngRoutes = require('./routes/OngsRoutes');
const IncidentRoutes = require('./routes/IncidentRoutes');
const ProfileRoutes = require('./routes/ProfileRotutes');
const AuthRoutes = require('./routes/AuthRoutes');

const routes = e.Router();

routes.use('/ongs', OngRoutes);
routes.use('/incidents', IncidentRoutes);
routes.use('/profile', ProfileRoutes);
routes.use('/auth', AuthRoutes);

module.exports = routes;