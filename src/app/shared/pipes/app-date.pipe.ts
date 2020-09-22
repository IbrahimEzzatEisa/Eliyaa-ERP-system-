import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/date.service';


@Pipe({
    name: 'appDate'
})
export class AppDatePipe implements PipeTransform {
    
    constructor(
    
        private dateService: DateService
    ){}

    transform(date: string | Date): string {
        if(!date) return '';
        date = new Date(date);

        let isHijri = true;
    
        if(!isHijri) {
            return this.dateService.fromGregorianToUmmulquraString(date) + ' هـ';
            
        } else {
            return this.dateService.fromGregorianToGregorianString(date) + ' م';
            
        }
    }
}