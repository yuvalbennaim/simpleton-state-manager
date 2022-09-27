const router = require('express').Router();
const fs = require('fs');
const users = require('./data/users.json');

router.post('/save', (req, res) => {
    let newUserRec = req.body.user.user;
    console.log('POST save:', JSON.stringify(newUserRec));
    replaceUserRec(newUserRec.user);
    let userRec = getUserRec(newUserRec.user.name);
    res.json({"user": userRec});

    /* save to file */
});

router.get('/login', (req, res, next) => {
	let userParam = req.query.username;
	let pwParam = req.query.password;
    let userRec = authenticateUser(userParam);
    
	if(userRec != null) {
		res.json({"name": userRec.name});
	} 
	else {
		res.status(500);
		res.json({"error": `User ${userParam} doe not exist`});
	}
});

router.get('/todos', (req, res, next) => {
	let userParam = req.query.username;
    let userRec = authenticateUser(userParam);
    
	if(userRec != null) {
		res.json({"todos": userRec.todos});
	} 
	else {
		res.status(500);
		res.json({"error": `User ${userParam} doe not exist`});
	}
});

function replaceUserRec(newUserRec) {
	for(let i = 0; i < users.length; i++) {
		let userRec = users[i];

		if(userRec.name == newUserRec.name) {
            users[i].portfolio = newUserRec.portfolio;
		}
    }
}

function getUserRec(user) {
	for(let i = 0; i < users.length; i++) {
		let userRec = users[i];

		if(userRec.name.toLowerCase() == user.toLowerCase()) {
			return userRec;
		}
	}

	return null;
}

function authenticateUser(userParam) {
	return getUserRec(userParam);
}

module.exports = router;
