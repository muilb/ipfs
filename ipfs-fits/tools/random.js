/**
 * Created by lebamui on 27/01/2019.
 */

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

module.exports = randomIntFromInterval;