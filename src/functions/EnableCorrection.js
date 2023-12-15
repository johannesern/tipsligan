export function EnableCorrection() {
    //get sunday and time after 20:00
    var today = new Date();
    var day = today.getDay();
    var hour = today.getHours();
    var minute = today.getMinutes();
    if (day == 0 && hour >= 20 && minute >= 0) {
        return true;
    }
    return false;
}