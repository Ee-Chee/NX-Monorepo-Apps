import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '@leng2/address-book/utilities';

@Pipe({ name: 'transformAddress' })

export class TransformAddressPipe implements PipeTransform {
    transform(value: Address): string {
        return `${value.street} ${value.number}, ${value.city}, ${value.postcode}`;
    }
}