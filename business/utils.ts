import { population } from './demographic';
import { add } from 'date-fns'

const VACCINE_PER_WEEK = 480000 

const VACCINES_PER_QUARTER = [
    28269000,
    57202000,
    53840000,
    14806000,
    28266000,
    20190000,
];
// 14 weeks in a quarter
function getVaccineRatioPerWeek(week: number): number {
    return VACCINES_PER_QUARTER[Math.min(week%14, VACCINES_PER_QUARTER.length - 1)]/14;
}

export function computeVaccineDatesV2(age: number): VaccineExpected {
    

    const popOfAge = getPopOfAge(age -1);
    console.log('compute age' , age, popOfAge)
    let vaccinated = 0;

    let startWeek = null;
    let endWeek = null;

    let week = 0;
    const maxWeek = 14 * (VACCINES_PER_QUARTER.length - 1);

    while (week < maxWeek && (startWeek == null || endWeek == null)){

        // console.log('compute week', week)
        vaccinated += getVaccineRatioPerWeek(week);

        if(isNaN(vaccinated)) {
            console.error('vaccinated NAN');
            debugger;
        }

        if(startWeek == null && vaccinated >= popAheadOfAge(age)) {
            startWeek = week;
            console.log('startWeek set', startWeek)
        }
        
        if(endWeek == null && vaccinated >= (popAheadOfAge(age) + popOfAge)) {
            endWeek = week === startWeek ? week + 1 : week;
            console.log('endWeek set', endWeek)
        }

        week +=1;
    }


    return {
        startDate: add(START_VACCINE_DATE_MILLIS, {weeks: startWeek ?? 1 -1}).getTime(),
        endDate: add(START_VACCINE_DATE_MILLIS, {weeks: endWeek ?? 1}).getTime()
    }


}


const VACCINE_PER_DAY = VACCINE_PER_WEEK/7;


const ALREADY_VACCINATED = 0;


const START_VACCINE_DATE_MILLIS = new Date('28 Dec 2020').getTime();

export function computeTotPop() {
    let tot = 0;
    population.forEach((pop) => {tot += pop} );
    return tot;
}

export function isValidAge(age:number): boolean {
    return age != null && age >= 0;
}

function getPopOfAge(age: number) {
    let safeAge = age;
    if (age === null || age < 0) safeAge = 0;
    if (age > population.length -1) safeAge = population.length -1;
    return population[safeAge];
}

export function popAheadOfAge(age: number): number {
    if (!isValidAge(age)) {
        return -1;
    }

    let popAhead = 0;
    // starting from older population
    for (let iterAge = population.length -1; iterAge >= 0; iterAge--) {
        if(iterAge === age -1) {
            break;
        }

        // console.log('add pop with age, ', iterAge +1)

        const currentPop = population[iterAge];
        popAhead += currentPop;
    }

    return popAhead - ALREADY_VACCINATED;

}

export interface VaccineExpected {
    startDate: number;
    endDate: number;
}

