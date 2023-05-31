import dbInit from './../src/database/init'

(async function () {
    console.log('++++++ Bootstraping Tests +++++++')
    await dbInit()
})()
