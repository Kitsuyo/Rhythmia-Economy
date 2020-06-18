module.exports = (client, message) => {
    
    const prefix = process.env.PREFIX;
    let cmdHandler = client.functions.get(`commandhandler`);
    try {
        cmdHandler.code(client, message, prefix);
    } catch (error) {
        return console.error(error);
    }
}