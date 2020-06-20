module.exports = {
    name: "withdraw",
    description: "Withdraw your money.",
    usage: '<amount/all>',
    category: "economy",
    aliases: ["with"],

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');

        getDB(message.author.id).then(res => {
            let amount = parseInt(args[0]);
            let tAmount = args[0];
            if (!amount && !tAmount) return message.channel.send(`You withdrew $0! Seriously..? Stop wasting my time please.`);
            let realAmount;
            if (tAmount.toLowerCase() === 'all') realAmount = res.balance.bank;
            else if (tAmount.toLowerCase() === 'half') realAmount = res.balance.purse/2;
            else if (tAmount.toLowerCase() === 'quarter') realAmount = res.balance.purse/4;
            else if (!isNaN(amount)) realAmount = amount;
            else return message.channel.send(`That isn't a valid number.`);
            res.balance.bank -= realAmount;
            res.balance.purse += realAmount;
            saveDB(res).then(message.channel.send(`Successfully withdrew $${realAmount}! You now have $${res.balance.purse} in your purse, and $${res.balance.bank} left in your bank!`));
        });
    }
}