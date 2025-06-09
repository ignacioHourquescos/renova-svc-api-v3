const handleDatabaseError = (error, res) => {
	console.log("Database query error", error.message);
	return res.status(500).send("Database query error");
};

module.exports = {
	handleDatabaseError,
};
