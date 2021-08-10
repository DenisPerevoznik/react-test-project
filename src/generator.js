import {Subject} from "rxjs";

export class Generator{

    sensorA$;
    sensorB$;
    sensorC$;
    sensorD$;
    constructor(){
        this.sensorA$ = new Subject();
        this.sensorB$ = new Subject();
        this.sensorC$ = new Subject();
        this.sensorD$ = new Subject();
    }

    getSensorDataA = (delay) => {
        setTimeout(() => {
            this.sensorA$.next((Math.random() * 1000).toFixed());
        }, delay);
    }

    getSensorDataB = (delay) => {
        setTimeout(() => {
            this.sensorB$.next((Math.random() * 1000).toFixed());
        }, delay);
    }

    getSensorDataC = (delay) => {
        setTimeout(() => {
            this.sensorC$.next((Math.random() * 1000).toFixed());
        }, delay);
    }

    getSensorDataD = (delay) => {
        setTimeout(() => {
            this.sensorD$.next((Math.random() * 1000).toFixed());
        }, delay);
    }
}
