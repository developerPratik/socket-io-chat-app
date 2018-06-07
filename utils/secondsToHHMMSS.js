export default function SecondsToTime(sec){


    if(sec < 60) {
        return `${sec} seconds`;
    }
    else if(sec < 3600){

        return `${Math.floor(sec / 60)} minutes and ${Math.floor(sec % 60)} seconds`

    }
}