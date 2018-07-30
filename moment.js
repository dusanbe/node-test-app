const bStart = 10;
const hStart = 15;
const bEnd = 100;
const hEnd = 200;

var moment = function moment (fb, k) {
    var moment = '[';
    for(let b=0;b<bEnd;b++){
        var momentRow = [];
        moment += '[';
        for(let h=0;h<hEnd;h++){
            momentRow[h] = fb / (k * k) * b * h * h;
            moment += (fb / (k * k) * b * h * h / 100).toString();
            moment += ',';
        }
        moment = moment.substring(0, moment.length - 1);
        moment += '],';
    }
    moment = moment.substring(0, moment.length - 1);
    moment += ']';

    return moment;
}

module.exports.moment = moment;