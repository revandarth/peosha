module.exports = function(app) {
	require('./user-route')(app);
	require('./experience-route')(app);
	require('./skill-route')(app);
	require('./job-route')(app);
	require('./company-route')(app);
	require('./bio-route')(app);
	require('./education-route')(app);
	require('./certification-route')(app);
};
