const Mailjet = require('node-mailjet');

const ValidateUser = async () => {
    const mailjet = new Mailjet({
        apiKey: "3b511d6cac017aac652b25b17fb6360e",
        apiSecret: "03e4d4ed563823933f6b4eb1f0d6b60a"
    });

    const request = mailjet
	.post("sender", {'version': 'v3'})
	.id("sm.clothes2@gmail.com")
	.action("validate")
	.request()

    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err)
    })
}

ValidateUser()

module.exports = {
    ValidateUser
}