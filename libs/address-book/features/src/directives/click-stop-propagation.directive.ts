import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[click-stop-propagation]'
})

export class ClickStopPropagation {
    @HostListener("click", ["$event"]) onClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();
    }
}