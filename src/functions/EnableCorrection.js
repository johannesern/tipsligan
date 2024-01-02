export function EnableCorrection() {
    var today = new Date();
    var day = today.getDay();
    var hour = today.getHours();
    const notDuringFootballTime = !(day === 6 && hour >= 15 && hour < 21);
    if (notDuringFootballTime) {
        return true;
    }
    return false;
}