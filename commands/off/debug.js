else if (  firstCmd === 'writelog' && message.author.id === config.boss )
{
    fs.appendFile( 'logFile.txt', client.rollMap.get( 'logfile' ), function (err) {
        if (err) throw err;
        console.log('Saved!');
        client.rollMap.set( 'logfile', '');
        });
    
}